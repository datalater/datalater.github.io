import { useTheme } from 'next-themes';
import { useMounted } from 'nextra/hooks';
import { MoonIcon, SunIcon } from 'nextra/icons';
import useSound from 'use-sound';
import switchOn from './assets/sounds/switch-on.mp3';
import switchOff from './assets/sounds/switch-off.mp3';

export default function ThemeSwitch() {
  const { setTheme, resolvedTheme } = useTheme();
  const mounted = useMounted();
  const isDark = resolvedTheme === 'dark';

  const [playSwitchOn] = useSound(switchOn);
  const [playSwitchOff] = useSound(switchOff);

  // @TODO: system theme
  const toggleTheme = () => {
    setTheme(isDark ? 'light' : 'dark');
    isDark ? playSwitchOn() : playSwitchOff();
  };

  return (
    <span
      role="button"
      aria-label="Toggle Dark Mode"
      className="nx-cursor-pointer nx-p-2 nx-text-current"
      tabIndex={0}
      onClick={toggleTheme}
      onKeyDown={(e) => {
        if (e.key === 'Enter') toggleTheme();
      }}
    >
      {mounted && isDark ? <MoonIcon /> : <SunIcon />}
    </span>
  );
}
