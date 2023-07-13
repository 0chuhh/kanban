import { useEffect, useState } from "react"
import { hexToRgb } from "services/HEXToRGB"

function computeLuminence(hex: string) {
    var { red, green, blue } = hexToRgb(hex);

    var colors = [red, green, blue];
    colors.forEach(color => {
        color = color / 255.0;
        if (color <= 0.03928) {
            color = color / 12.92;
        } else {
            color = Math.pow(((color + 0.055) / 1.055), 2.4);
        }
    })
    var luminence = 0.2126 * colors[0] + 0.7152 * colors[1] + 0.0722 * colors[2];

    return luminence;
}

export const useContrastColor = (hex: string) => {
    const [contrastColor, setContrastColor] = useState<`#${string}`>()

    useEffect(() => {
        const luminence = computeLuminence(hex)
        console.log(luminence, hex)

        if (luminence > 160.0 || luminence === 0) {
            setContrastColor('#000')
        }
        else {
            setContrastColor('#fff')
        }


    }, [hex])
    return contrastColor
}