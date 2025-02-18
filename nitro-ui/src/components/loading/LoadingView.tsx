import { FC, useState, useEffect } from "react";
import { Base, Column, Text } from "../../common";

interface LoadingViewProps {
  percent: number;
}

const tips = [
  "Crabs never sleep... neither do Habbo traders.",
  "If you see a crab, say '🦀' in global chat.",
  "Fun fact: This crab has more pixels than your furniture collection.",
  "Tip: The secret to Habbo success? Never trust a free giveaway.",
  "You are now 80% more crabby. Keep waiting.",
  "Some say crabs rule the Hotel... Some say it's a conspiracy.",
];

export const LoadingView: FC<LoadingViewProps> = ({ percent = 0 }) => {
  const [tipIndex, setTipIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setTipIndex((prevIndex) => (prevIndex + 1) % tips.length);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  return (
    <Column fullHeight position="relative" className="nitro-loading">
      <Base fullHeight className="container h-100">
        <Column fullHeight alignItems="center" justifyContent="end">
          <Base className="connecting-crab" />
          <Column size={6} className="text-center py-4">
            <Text fontSize={2} variant="white" className="text-shadow loading-percent">
              {percent.toFixed()}%
            </Text>
            <Text fontSize={2} variant="white" className="text-shadow loading-tip">
              {tips[tipIndex]}
            </Text>
          </Column>
        </Column>
      </Base>
    </Column>
  );
};
