import { View, TouchableOpacity } from 'react-native';
import { styles } from './styles';
import { ChatTeardropDots } from 'phosphor-react-native';
import React, { useRef } from 'react';
import { theme } from '../../theme';
import BottomSheet from '@gorhom/bottom-sheet'
import { gestureHandlerRootHOC } from 'react-native-gesture-handler';
import { Options } from '../options';
import { feedbackTypes } from '../../utils/feedbackTypes'
import { Form } from '../form';
export type FeedbackType = keyof typeof feedbackTypes

export function Widget() {
    const bottomSheetRef = useRef<BottomSheet>(null)
    function handleOpen() {
        bottomSheetRef.current?.expand()
    }
    return (
        <>
            <TouchableOpacity
                style={styles.button}
                onPress={handleOpen}>
                <ChatTeardropDots
                    size={24}
                    weight="bold"
                    color={theme.colors.text_on_brand_color}
                />
            </TouchableOpacity>
            <BottomSheet
                ref={bottomSheetRef}
                snapPoints={[1, 280]}
                backgroundStyle={styles.modal}
                handleIndicatorStyle={styles.indicator}>
                <Options />
                <Form feedbackType="BUG" />
            </BottomSheet>
        </>
    );
}

export default gestureHandlerRootHOC(Widget);