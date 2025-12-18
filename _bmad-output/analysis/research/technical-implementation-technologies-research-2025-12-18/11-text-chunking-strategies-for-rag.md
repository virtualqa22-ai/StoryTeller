# 11. Text Chunking Strategies for RAG

## 11.1 Chunking Overview

**RAG Workflow Context:** ([Medium - Abdelhadi Azzouni](https://medium.com/@hadiazouni/text-splitting-chunking-for-rag-applications-7ccbb6dcc9f9), [IBM](https://www.ibm.com/think/tutorials/chunking-strategies-for-rag-with-langchain-watsonx-ai), [F22 Labs](https://www.f22labs.com/blogs/7-chunking-strategies-in-rag-you-need-to-know/), [Unstructured](https://unstructured.io/blog/chunking-for-rag-best-practices))

**Definition:**
- "**Text splitting, or chunking**, is the **first step in a RAG** (Retrieval Augmented Generation) workflow"
- "Transforming **long text documents into smaller chunks** that are embedded, indexed, stored then later used for information retrieval"

## 11.2 Main Chunking Strategies

### **1. Fixed-Size Chunking**

**Description:**
- "Text splitting with a **specific chunk size** and optional **chunk overlap**"
- "**Most common and straightforward** approach"

**Parameters:**
- Chunk size (e.g., 250 tokens, ~1000 characters)
- Overlap (e.g., 10-20% of chunk size)

**Pros:**
- Simple to implement
- Predictable token usage
- Fast processing

**Cons:**
- May split mid-sentence or mid-paragraph
- Ignores semantic boundaries
- Can lose context at boundaries

---

### **2. Recursive Chunking**

**Description:**
- "**Iterates through default separators** including ["\n\n", "\n", " ", ""] until one produces preferred chunk size"
- "Using **hierarchical separators** so that paragraphs, followed by sentences and then words, are **kept together as much as possible**"

**Algorithm:**
1. Try splitting on paragraph breaks (\n\n)
2. If chunks still too large, split on line breaks (\n)
3. If still too large, split on sentences (.)
4. If still too large, split on words ( )

**Pros:**
- Respects document structure
- Preserves semantic units (paragraphs)
- Better context preservation

**Cons:**
- More complex implementation
- Variable chunk sizes

---

### **3. Semantic Chunking**

**Description:**
- "Splits text in a way that **groups sentences based on semantic similarity** of their embeddings"
- "Embeddings of high semantic similarity are **closer together** than those of low semantic similarity"
- "Breaks text into chunks based on **meaning rather than fixed sizes**"
- "Ensures each chunk contains **coherent and relevant information** by analyzing **shifts in text's semantic structure**" ([F22 Labs](https://www.f22labs.com/blogs/7-chunking-strategies-in-rag-you-need-to-know/))

**Process:**
1. Generate embeddings for each sentence
2. Calculate similarity scores between adjacent sentences
3. Split where similarity drops significantly
4. Group sentences with high similarity into chunks

**Pros:**
- "**Preserves meaning** by creating chunks around logical content breaks"
- "**Adaptable to diverse content** like research papers or technical documents"
- "**Improves retrieval accuracy** by maintaining semantic integrity" ([F22 Labs](https://www.f22labs.com/blogs/7-chunking-strategies-in-rag-you-need-to-know/))

**Cons:**
- Computationally expensive (requires embeddings)
- Variable chunk sizes
- More complex implementation

---

### **4. Document-Based Chunking**

**Description:**
- "Splits based on **document structure**"
- "Can utilize **Markdown text, images, tables** and even **Python code classes and functions** as ways of determining structure" ([F22 Labs](https://www.f22labs.com/blogs/7-chunking-strategies-in-rag-you-need-to-know/))

**For Novels:**
- Split by chapters (natural semantic units)
- Split by scenes (if marked in manuscript)
- Preserve structural hierarchy

---

### **5. Agentic Chunking (Experimental)**

**Description:**
- "Leverages **agentic AI** by allowing the LLM to **determine appropriate document splitting** based on semantic meaning and content structure"
- "Such as paragraph types, section headings, step-by-step instructions and more"
- "**Experimental**, attempting to **simulate human reasoning** when processing long documents" ([F22 Labs](https://www.f22labs.com/blogs/7-chunking-strategies-in-rag-you-need-to-know/))

**Pros:**
- Most intelligent splitting
- Context-aware boundaries

**Cons:**
- Experimental, not production-ready
- Expensive (requires LLM calls)
- Slower processing

## 11.3 Best Practices

**Chunk Size Recommendations:** ([Unstructured](https://unstructured.io/blog/chunking-for-rag-best-practices))
- "A chunk size of about **250 tokens**, equivalent to approximately **1000 characters**, is a **sensible starting point** for experimentation"
- "**Optimal chunk size** depends on the nature of your documents"
- "Aiming to optimize for **smaller chunks without losing important context**"

**General Advice:**
- "**Experiment with different chunk sizes**"
- "Utilize **smart chunking strategies** that separate text on **semantically meaningful boundaries**"

## 11.4 Chunking Recommendation for StoryTeller

**Recommended: Hybrid Strategy**

**For Story Bible Content:**
1. **Character Profiles**: Document-based (one chunk per character)
2. **Plot Threads**: Document-based (one chunk per thread)
3. **World Rules**: Semantic chunking (group related rules)
4. **Manuscript**: Chapter-based (one chunk per chapter or scene)

**Chunking Parameters:**
- **Target size**: 1000-2000 characters (250-500 tokens)
- **Overlap**: 10-15% for context continuity
- **Method**: Recursive (respect paragraphs) or semantic (if compute acceptable)

**Use Cases:**
- Retrieve relevant Story Bible content before AI generation
- Find similar scenes/characters for consistency checking
- Search across manuscript for patterns

---
