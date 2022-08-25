import React, { useContext } from "react";
import { Text, TouchableOpacity, StyleSheet, View } from "react-native";
import { ITheme } from "../utils/contexts/interfaces";
import { ThemeContext } from "../utils/contexts";

interface IButton {
  children: React.ReactNode;
  onPress?: () => void;
  icon?: React.ReactNode;
  customStyle?: any;
  position?: "left" | "right";
  variant?: "primary" | "secondary" | "tertiary";
  disabled?: boolean;
  [x: string]: any;
}

function getVariantStyle(
  theme: ITheme,
  variant: string,
  target: string,
  isDarkMode: boolean
) {
  if (target === "container") {
    switch (variant) {
      case "primary": {
        return {
          backgroundColor: theme.colors.regionalColor,
          borderWidth: 0,
          borderColor: "transparent",
        };
      }
      case "secondary": {
        return {
          backgroundColor: "transparent",
          borderWidth: 2,
          borderColor: theme.colors.primary,
        };
      }
      case "tertiary": {
        return {};
      }
      default: {
        return {};
      }
    }
  } else if (target === "text") {
    switch (variant) {
      case "primary": {
        return {
          color: isDarkMode ? theme.colors.black : theme.colors.white,
        };
      }
      case "secondary": {
        return {
          color: theme.colors.primary,
        };
      }
      case "tertiary": {
        return {
          color: theme.colors.primary,
        };
      }
      default:
        break;
    }
  }
}

function getStyles(
  theme: ITheme,
  variant: "primary" | "secondary" | "tertiary",
  isDarkMode: boolean
): any {
  return StyleSheet.create({
    container: {
      // width: "100%",
      borderRadius: 8,
      ...getVariantStyle(theme, variant, "container", isDarkMode),
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      overflow: "hidden",
    },
    disabled: {
      backgroundColor: "grey",
    },
    innerContainer: {
      paddingVertical: 16,
      paddingHorizontal: 0,
      width: "100%",
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: theme.colors.regionalColor,
    },
    text: {
      fontFamily: theme.fonts.body.fontFamily,
      ...getVariantStyle(theme, variant, "text", isDarkMode),
      fontSize: theme.fonts.body.fontSize,
      fontWeight: "500",
    },
  });
}

const Button: React.FC<IButton> = ({
  children,
  onPress,
  icon: IconComp,
  position,
  customStyle = {},
  disabled = false,
  variant = "primary",
  ...remaining
}) => {
  const { theme, isDarkMode } = useContext(ThemeContext);
  return (
    <View
      style={[getStyles(theme, variant, isDarkMode).container, customStyle]}
    >
      <TouchableOpacity
        onPress={onPress}
        disabled={disabled}
        style={{
          ...getStyles(theme, variant, isDarkMode).innerContainer,
          ...(disabled ? getStyles(theme, variant, isDarkMode).disabled : {}),
        }}
        {...remaining}
      >
        {position && position === "left" && IconComp}
        <Text style={getStyles(theme, variant, isDarkMode).text}>
          {children}
        </Text>
        {position && position === "right" && IconComp}
      </TouchableOpacity>
    </View>
  );
};

export default Button;
