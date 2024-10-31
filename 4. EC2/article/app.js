// app.js

import express from 'express';
import { PrismaClient } from '@prisma/client';

const app = express();
const prisma = new PrismaClient();

app.use(express.json());

// Create a new Article
app.post('', async (req, res) => {
  const { title, content } = req.body;
  try {
    const article = await prisma.article.create({
      data: {
        title,
        content,
      },
    });
    res.status(201).json(article);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create article' });
  }
});

// Get all Articles
app.get('', async (req, res) => {
  try {
    const articles = await prisma.article.findMany();
    res.status(200).json(articles);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch articles' });
  }
});

// Get a single Article by ID
app.get('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const article = await prisma.article.findUnique({
      where: { id: parseInt(id) },
    });
    if (article) {
      res.status(200).json(article);
    } else {
      res.status(404).json({ error: 'Article not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch article' });
  }
});

// Update an Article by ID
app.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { title, content } = req.body;
  try {
    const article = await prisma.article.update({
      where: { id: parseInt(id) },
      data: {
        title,
        content,
        editedDatetime: new Date(),
      },
    });
    res.status(200).json(article);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update article' });
  }
});

// Delete an Article by ID
app.delete('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await prisma.article.delete({
      where: { id: parseInt(id) },
    });
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete article' });
  }
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});