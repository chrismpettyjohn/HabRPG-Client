import { FaSpinner } from "react-icons/fa";
import { Text } from "../../common";
import { ReactNode } from "react";

export interface LoadingIconProps {
  children?: ReactNode;
}

export function LoadingIcon({ children }: LoadingIconProps) {
  return (
    <div style={{ alignItems: "center", display: "flex", flex: 1, flexDirection: "column", gap: 14, justifyContent: "center" }}>
      <FaSpinner style={{ fontSize: 32, animation: "spin 2s linear infinite" }} />
      <Text bold fontSize={4}>
        {children}
      </Text>
    </div>
  );
}
