import axios from "axios";
import Chat from "../models/Chat.js";
import User from "../models/User.js";
import openai from "../configs/openai.js";

// Text-based AI Chat Message Controller
export const textMessageController = async (req, res) => {
  try {
    const userId = req.user._id

    // Check credits
    if (req.user.credits < 1) {
      return res.json({
        success: false,
        message: "You don't have enough credits to use this feature"
      })
    }

    const { chatId, prompt } = req.body

    const chat = await Chat.findOne({ userId, _id: chatId })
    chat.messages.push({
      role: "user",
      content: prompt,
      timestamp: Date.now(),
      isImage: false
    })

    const { choices } = await openai.chat.completions.create({
      model: "gemini-2.5-flash",
      messages: [{ role: "user", content: prompt }]
    });


    const reply = { ...choices[0].message, timestamp: Date.now(), isImage: false }
    res.json({ success: true, reply })

    chat.messages.push(reply)
    await chat.save()

    await User.updateOne({ _id: userId }, { $inc: { credits: -1 } })

  } catch (error) {
    res.json({ success: false, message: error.message });
  }
}

// Image Generation Message Controller using Pollinations AI
export const imageMessageController = async (req, res) => {
  try {
    const userId = req.user._id;

    // Check credits
    if (req.user.credits < 2) {
      return res.json({
        success: false,
        message: "You don't have enough credits to use this feature"
      });
    }

    const { prompt, chatId, isPublished } = req.body;
    
    // Find chat
    const chat = await Chat.findOne({ userId, _id: chatId });
    if (!chat) {
      return res.json({
        success: false,
        message: "Chat not found"
      });
    }

    // Push user message
    chat.messages.push({
      role: "user",
      content: prompt,
      timestamp: Date.now(),
      isImage: false
    });

    // Generate image using Pollinations AI
    const response = await axios.post(
      "https://gen.pollinations.ai/v1/images/generations",
      {
        prompt,
        model: "flux",
        width: 800,
        height: 800,
        response_format: "url"
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.POLLINATIONS_API_KEY}`
        }
      }
    );

    const imageUrl =
      response.data?.data?.[0]?.url ||
      (response.data?.data?.[0]?.b64_json
        ? `data:image/jpeg;base64,${response.data.data[0].b64_json}`
        : null);

    if (!imageUrl) {
      return res.json({
        success: false,
        message: "Failed to generate image from Pollinations AI"
      });
    }

    const reply = {
      role: "assistant",
      content: imageUrl,
      timestamp: Date.now(),
      isImage: true,
      isPublished: Boolean(isPublished)
    };

    res.json({ success: true, reply });

    chat.messages.push(reply);
    await chat.save();

    await User.updateOne({ _id: userId }, { $inc: { credits: -2 } });

  } catch (error) {
    const errorMsg =
      error?.response?.data?.error?.message ||
      error?.response?.data?.message ||
      error.message;
    console.error("Pollinations image generation error:", errorMsg);
    res.json({ success: false, message: errorMsg });
  }
};