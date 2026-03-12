/// <reference types="vite/client" />
/// <reference types="vitest/globals" />

interface ImportMetaEnv {
	readonly VITE_SITE_URL?: string;
	readonly VITE_OG_IMAGE_TEMPLATE_URL?: string;
}

interface ImportMeta {
	readonly env: ImportMetaEnv;
}
