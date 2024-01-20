interface Window {
  CUSDIS?: {
    setTheme(theme: 'dark' | 'light' | 'auto'): void;
  };
}

declare module '*.mp3' {
  const content: string;
  export default content;
}
