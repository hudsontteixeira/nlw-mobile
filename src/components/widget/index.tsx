import { View, TouchableOpacity } from 'react-native';
import { styles } from './styles';
import { ChatTeardropDots } from 'phosphor-react-native';
import React, { useRef, useState } from 'react';
import { theme } from '../../theme';
import BottomSheet from '@gorhom/bottom-sheet'
import { gestureHandlerRootHOC } from 'react-native-gesture-handler';
import { Options } from '../options';
import { feedbackTypes } from '../../utils/feedbackTypes'
import { Form } from '../form';
import { Success } from '../success';
export type FeedbackType = keyof typeof feedbackTypes

export function Widget() {
    const bottomSheetRef = useRef<BottomSheet>(null)
    function handleOpen() {
        bottomSheetRef.current?.expand()
    }
    const [feedbackType, setFeedbackType] = useState<FeedbackType | null>(null)
    const [feedbackSent, setFeedbackSent] = useState(false)

    function handleRestartFeedback() {
        setFeedbackType(null);
        setFeedbackSent(false)
    }

    function handleFeedbackSent() {
        setFeedbackSent(true)
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
                {!feedbackSent ?

                    <>
                        {feedbackType ?
                            <Form feedbackType={feedbackType}
                                onFeedbackSent={handleFeedbackSent}
                                onFeedbackCanceled={handleRestartFeedback}
                            />
                            :
                            <Options onFeedbackTypeChanged={setFeedbackType} />
                        }
                    </>
                    :
                    <Success
                        onSendAnotherFeedback={handleRestartFeedback} />
                }
            </BottomSheet>
        </>
    );
}

export default gestureHandlerRootHOC(Widget);