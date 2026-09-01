# Third-Party Open-Source Model Notices

Pär (the application) is proprietary software. See the root LICENSE file for the terms governing use of Pär itself.

Pär downloads and runs open-source AI models locally on your device. The following models and software are used by Pär and are subject to their own license terms. Pär respects the license requirements of every model and dependency listed here.

## Open-source models bundled or downloadable by Pär

### Qwen 3B

- **Authors:** Alibaba Cloud
- **License:** MIT
- **License text:** [legal/MIT-LICENSE.txt](legal/MIT-LICENSE.txt)
- **Source:** https://huggingface.co/Qwen/Qwen2.5-3B-Instruct-GGUF
- **Use in Pär:** Qwen 3B by Alibaba Cloud, used under the MIT license. Source: https://huggingface.co/Qwen/Qwen2.5-3B-Instruct-GGUF

### Qwen 7B

- **Authors:** Alibaba Cloud
- **License:** MIT
- **License text:** [legal/MIT-LICENSE.txt](legal/MIT-LICENSE.txt)
- **Source:** https://huggingface.co/Qwen/Qwen2.5-7B-Instruct-GGUF
- **Use in Pär:** Qwen 7B by Alibaba Cloud, used under the MIT license. Source: https://huggingface.co/Qwen/Qwen2.5-7B-Instruct-GGUF

### Qwen 14B

- **Authors:** Alibaba Cloud
- **License:** MIT
- **License text:** [legal/MIT-LICENSE.txt](legal/MIT-LICENSE.txt)
- **Source:** https://huggingface.co/Qwen/Qwen2.5-14B-Instruct-GGUF
- **Use in Pär:** Qwen 14B by Alibaba Cloud, used under the MIT license. Source: https://huggingface.co/Qwen/Qwen2.5-14B-Instruct-GGUF

### Qwen 32B

- **Authors:** Alibaba Cloud
- **License:** MIT
- **License text:** [legal/MIT-LICENSE.txt](legal/MIT-LICENSE.txt)
- **Source:** https://huggingface.co/Qwen/Qwen2.5-32B-Instruct-GGUF
- **Use in Pär:** Qwen 32B by Alibaba Cloud, used under the MIT license. Source: https://huggingface.co/Qwen/Qwen2.5-32B-Instruct-GGUF

### Mistral Nemo 12B

- **Authors:** Mistral AI
- **License:** Apache-2.0
- **License text:** [legal/Apache-2.0-LICENSE.txt](legal/Apache-2.0-LICENSE.txt)
- **Source:** https://huggingface.co/bartowski/Mistral-Nemo-Instruct-2407-GGUF
- **Use in Pär:** Mistral Nemo 12B by Mistral AI, used under the Apache-2.0 license. Source: https://huggingface.co/bartowski/Mistral-Nemo-Instruct-2407-GGUF

### Qwen Coder 7B

- **Authors:** Alibaba Cloud
- **License:** MIT
- **License text:** [legal/MIT-LICENSE.txt](legal/MIT-LICENSE.txt)
- **Source:** https://huggingface.co/Qwen/Qwen2.5-Coder-7B-Instruct-GGUF
- **Use in Pär:** Qwen Coder 7B by Alibaba Cloud, used under the MIT license. Source: https://huggingface.co/Qwen/Qwen2.5-Coder-7B-Instruct-GGUF

### Phi-4 Mini

- **Authors:** Microsoft Corporation
- **License:** MIT
- **License text:** [legal/MIT-LICENSE.txt](legal/MIT-LICENSE.txt)
- **Source:** https://huggingface.co/bartowski/Phi-4-mini-instruct-GGUF
- **Use in Pär:** Phi-4 Mini by Microsoft Corporation, used under the MIT license. Source: https://huggingface.co/bartowski/Phi-4-mini-instruct-GGUF

### Qwen 0.5B

- **Authors:** Alibaba Cloud
- **License:** MIT
- **License text:** [legal/MIT-LICENSE.txt](legal/MIT-LICENSE.txt)
- **Source:** https://huggingface.co/Qwen/Qwen2-0.5B-Instruct-GGUF
- **Use in Pär:** Qwen 0.5B by Alibaba Cloud, used under the MIT license. Source: https://huggingface.co/Qwen/Qwen2-0.5B-Instruct-GGUF

## Embedding models

### Nomic Embed v1.5

- **Authors:** Nomic, Inc.
- **License:** Apache-2.0
- **License text:** [legal/Apache-2.0-LICENSE.txt](legal/Apache-2.0-LICENSE.txt)
- **Source:** https://huggingface.co/nomic-ai/nomic-embed-text-v1.5-GGUF
- **Use in Pär:** Nomic Embed v1.5 by Nomic, Inc., used under the Apache-2.0 license. Source: https://huggingface.co/nomic-ai/nomic-embed-text-v1.5-GGUF

## Optional Ollama integration

When Ollama is enabled, Pär connects to a local Ollama server. Models are pulled and executed by Ollama on your device and are governed by Ollama's Terms of Service and by the license of each individual model. Pär does not distribute Ollama models.

### Qwen 3 8B (Ollama)

- **Authors:** Alibaba Cloud
- **License:** MIT
- **License text:** [legal/MIT-LICENSE.txt](legal/MIT-LICENSE.txt)
- **Source:** https://ollama.com/library/qwen3

### mxbai-embed-large (Ollama)

- **Authors:** mixedbread.ai
- **License:** Apache-2.0
- **License text:** [legal/Apache-2.0-LICENSE.txt](legal/Apache-2.0-LICENSE.txt)
- **Source:** https://ollama.com/library/mxbai-embed-large

### Qwen2.5-VL 7B (Ollama)

- **Authors:** Alibaba Cloud
- **License:** MIT
- **License text:** [legal/MIT-LICENSE.txt](legal/MIT-LICENSE.txt)
- **Source:** https://ollama.com/library/qwen2.5vl

### Gemma 3 12B (Ollama)

- **Authors:** Google DeepMind
- **License:** Gemma
- **License text:** [legal/Gemma-LICENSE.txt](legal/Gemma-LICENSE.txt)
- **Source:** https://ollama.com/library/gemma3

## Third-party software

Pär uses the following open-source software to load and run models:

- **llama.cpp** — used to run GGUF models locally. License: MIT / Business Source License 1.1 (see upstream repository for current terms). https://github.com/ggerganov/llama.cpp
- **huggingface_hub** — used for resumable model downloads. License: Apache-2.0. https://github.com/huggingface/huggingface_hub
- **Ollama** — optional integration for local model serving. https://ollama.com/legal/terms

---

This file is generated by `agent/license_attribution_agent.py`. Do not edit manually; update `config/routing.yaml` and run `python scripts/sync_attribution.py --write` instead.
