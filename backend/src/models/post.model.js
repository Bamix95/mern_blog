import mongoose from "mongoose";

const postSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },

    slug: {
      type: String,
      unique: true,
      lowercase: true,
      trim: true,
    },

    excerpt: {
      type: String,
      trim: true,
      maxlength: 300,
    },

    body: {
      type: String,
      required: true,
    },

    category: {
      type: String,
      enum: ["Essays", "Technology", "Travel", "Craft", "Design"],
      required: true,
    },

    readingTime: {
      type: Number,
    },

    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    status: {
      type: String,
      enum: ["draft", "published"],
      default: "draft",
    },

    publishedAt: {
      type: Date,
      default: null,
    },
  },
  {
    timestamps: true,
  },
);

postSchema.pre("save", function () {
  if (this.isModified("title")) {
    this.slug = this.title
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, "")
      .trim()
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-");
  }

  if (this.isModified("body")) {
    this.excerpt = this.body
      .replace(/[#*_>\n]+/g, " ")
      .trim()
      .slice(0, 200)
      .trimEnd()
      .concat("...");

    const wordCount = this.body.trim().split(/\s+/).length;
    this.readingTime = Math.ceil(wordCount / 200);
  }

  if (
    this.isModified("status") &&
    this.status === "published" &&
    !this.publishedAt
  ) {
    this.publishedAt = new Date();
  }
});

const Post = mongoose.model("Post", postSchema);
export default Post;
