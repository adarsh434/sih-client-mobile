import React, { useContext } from "react";
import { StyleSheet, View } from "react-native";
import Svg, { Path } from "react-native-svg";
import { ThemeContext } from "../../utils/contexts";

const PlayIcon: React.FC<{ color?: string; customStyle?: any }> = ({
  color,
}) => {
  const { theme } = useContext(ThemeContext);
  return (
    <Svg
      width="12"
      height="15"
      viewBox="0 0 12 15"
      fill="none"
      //xmlns="http://www.w3.org/2000/svg"
    >
      <Path
        d="M11.5 6.63397C12.1667 7.01888 12.1667 7.98112 11.5 8.36602L1.75 13.9952C1.08333 14.3801 0.249999 13.899 0.249999 13.1292L0.25 1.87083C0.25 1.10103 1.08333 0.619909 1.75 1.00481L11.5 6.63397Z"
        fill={theme.colors.primary}
      />
    </Svg>
  );
};

const styles = StyleSheet.create({});
export default PlayIcon;
