import { useEffect, useRef } from "react";

const AutoGrowTextarea = (
  props: React.TextareaHTMLAttributes<HTMLTextAreaElement>
) => {
  const { onInput, ...restProps } = props;

  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    autoGrowTextarea();
  }, []);

  const autoGrowTextarea = () => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    textarea.style.height = "auto";
    textarea.style.height = `${textarea.scrollHeight}px`;
  };

  const handleInput = (e: React.FormEvent<HTMLTextAreaElement>) => {
    autoGrowTextarea();
    onInput?.(e);
  };

  return (
    <textarea
      ref={textareaRef}
      {...restProps}
      onInput={handleInput}
    />
  );
};

export default AutoGrowTextarea;
