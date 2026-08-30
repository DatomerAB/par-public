# Third-Party Open-Source Model Notices

Pär (the application) is proprietary software. The terms governing use of Pär itself are described separately.

Pär downloads and runs open-source AI models locally on your device. The following models and software are used by Pär and are subject to their own license terms. Pär respects the license requirements of every model and dependency listed here.

This page is also available on the company website at [https://datomer.eu/models](https://datomer.eu/models).

## Open-source models bundled or downloadable by Pär

| Model | Authors | License | Source |
|---|---|---|---|
| Qwen 3B | Alibaba Cloud | [MIT](https://huggingface.co/Qwen/Qwen2.5-3B-Instruct/blob/main/LICENSE) | [Hugging Face](https://huggingface.co/Qwen/Qwen2.5-3B-Instruct-GGUF) |
| Qwen 7B | Alibaba Cloud | [MIT](https://huggingface.co/Qwen/Qwen2.5-7B-Instruct/blob/main/LICENSE) | [Hugging Face](https://huggingface.co/Qwen/Qwen2.5-7B-Instruct-GGUF) |
| Qwen 14B | Alibaba Cloud | [MIT](https://huggingface.co/Qwen/Qwen2.5-14B-Instruct/blob/main/LICENSE) | [Hugging Face](https://huggingface.co/Qwen/Qwen2.5-14B-Instruct-GGUF) |
| Qwen 32B | Alibaba Cloud | [MIT](https://huggingface.co/Qwen/Qwen2.5-32B-Instruct/blob/main/LICENSE) | [Hugging Face](https://huggingface.co/Qwen/Qwen2.5-32B-Instruct-GGUF) |
| Mistral Nemo 12B | Mistral AI | [Apache-2.0](https://huggingface.co/bartowski/Mistral-Nemo-Instruct-2407-GGUF/blob/main/README.md) | [Hugging Face](https://huggingface.co/bartowski/Mistral-Nemo-Instruct-2407-GGUF) |
| Qwen Coder 7B | Alibaba Cloud | [MIT](https://huggingface.co/Qwen/Qwen2.5-Coder-7B-Instruct/blob/main/LICENSE) | [Hugging Face](https://huggingface.co/Qwen/Qwen2.5-Coder-7B-Instruct-GGUF) |
| Phi-4 Mini | Microsoft Corporation | [MIT](https://huggingface.co/bartowski/Phi-4-mini-instruct-GGUF/blob/main/README.md) | [Hugging Face](https://huggingface.co/bartowski/Phi-4-mini-instruct-GGUF) |
| Qwen 0.5B | Alibaba Cloud | [MIT](https://huggingface.co/Qwen/Qwen2-0.5B-Instruct/blob/main/LICENSE) | [Hugging Face](https://huggingface.co/Qwen/Qwen2-0.5B-Instruct-GGUF) |

## Embedding models

| Model | Authors | License | Source |
|---|---|---|---|
| Nomic Embed v1.5 | Nomic, Inc. | [Apache-2.0](https://huggingface.co/nomic-ai/nomic-embed-text-v1.5/blob/main/LICENSE) | [Hugging Face](https://huggingface.co/nomic-ai/nomic-embed-text-v1.5-GGUF) |

## Optional Ollama integration

When Ollama is enabled, Pär connects to a local Ollama server. Models are pulled and executed by Ollama on your device and are governed by Ollama's Terms of Service and by the license of each individual model. Pär does not distribute Ollama models.

| Model | Authors | License | Source |
|---|---|---|---|
| Qwen 3 8B (Ollama) | Alibaba Cloud | [MIT](https://huggingface.co/Qwen/Qwen3-8B/blob/main/LICENSE) | [Ollama](https://ollama.com/library/qwen3) |
| mxbai-embed-large (Ollama) | mixedbread.ai | [Apache-2.0](https://huggingface.co/mixedbread-ai/mxbai-embed-large-v1/blob/main/LICENSE) | [Ollama](https://ollama.com/library/mxbai-embed-large) |
| Qwen2.5-VL 7B (Ollama) | Alibaba Cloud | [MIT](https://huggingface.co/Qwen/Qwen2.5-VL-7B-Instruct/blob/main/LICENSE) | [Ollama](https://ollama.com/library/qwen2.5vl) |
| Gemma 3 12B (Ollama) | Google DeepMind | [Gemma](https://ai.google.dev/gemma/terms) | [Ollama](https://ollama.com/library/gemma3) |

## Third-party software

Pär uses the following open-source software to load and run models:

- **llama.cpp** — used to run GGUF models locally. License: MIT / Business Source License 1.1 (see upstream repository for current terms). https://github.com/ggerganov/llama.cpp
- **huggingface_hub** — used for resumable model downloads. License: Apache-2.0. https://github.com/huggingface/huggingface_hub
- **Ollama** — optional integration for local model serving. https://ollama.com/legal/terms

---

Last updated: 2026-08-14
