import { useRef, useState } from "react";
import { Pressable, Text, View } from "react-native";
import { Icon, Portal } from "react-native-paper";

import InfoTooltip from "@/app/components/info_tooltip";
import useIsMobile from "@/app/hooks/useIsMobile";
import { HEADER_SIZE } from "@/app/constants";

interface TermWarningProps {
    popupTitle: string;
    popupDescription: string;
}

export default function TermWarning(props: TermWarningProps) {
    const mobile = useIsMobile();

    const [isVisible, setIsVisible] = useState(false);

    const componentRef = useRef<View>(null);

    
    return <View ref={componentRef} className="flex justify-center items-center">
        <Pressable
            onPressIn={() => setIsVisible(true)}
            onPressOut={() => setTimeout(() => setIsVisible(false), 2000)}
            onHoverIn={() => setIsVisible(true)}
            onHoverOut={() => setIsVisible(false)}>
            <Icon source="alert-circle-outline" color="#abaa43" size={18} />
        </Pressable>
        <InfoTooltip parentRef={componentRef} title={props.popupTitle}
         description={props.popupDescription} offsetX={20} offsetY={mobile ? -1*HEADER_SIZE + 3 : 10} visible={isVisible} />
    </View>
}