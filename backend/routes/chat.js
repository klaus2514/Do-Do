import express from "express";
import Thread from "../models/Thread.js";
import getOpenAIAPIResponse from "../utils/openai.js";
import auth from "../middleware/auth.js";

const router = express.Router();

router.get("/thread", auth, async (req, res) => {
  try {
    const threads = await Thread.find({ userId: req.userId }).sort({ updatedAt: -1 });
    res.json(threads);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch threads" });
  }
});

router.get("/thread/:threadId", auth, async (req, res) => {
  const { threadId } = req.params;
  try {
    const thread = await Thread.findOne({ threadId, userId: req.userId });
    if (!thread) return res.status(404).json({ error: "Thread not found" });
    res.json(thread.messages);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch chat" });
  }
});

router.delete("/thread/:threadId", auth, async (req, res) => {
  const { threadId } = req.params;
  try {
    const deleted = await Thread.findOneAndDelete({ threadId, userId: req.userId });
    if (!deleted) return res.status(404).json({ error: "Thread not found" });
    res.json({ success: "Thread deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: "Failed to delete thread" });
  }
});

router.post("/chat", auth, async (req, res) => {
  const { threadId, message } = req.body;
  if (!threadId || !message) return res.status(400).json({ error: "Missing required fields" });

  try {
    let thread = await Thread.findOne({ threadId, userId: req.userId });

    if (!thread) {
      thread = new Thread({
        threadId,
        title: message,
        userId: req.userId,
        messages: [{ role: "user", content: message }]
      });
    } else {
      thread.messages.push({ role: "user", content: message });
    }

    const assistantReply = await getOpenAIAPIResponse(message);
    thread.messages.push({ role: "assistant", content: assistantReply });
    thread.updatedAt = new Date();

    await thread.save();
    res.json({ reply: assistantReply });
  } catch (err) {
    res.status(500).json({ error: "Something went wrong" });
  }
});

export default router;
