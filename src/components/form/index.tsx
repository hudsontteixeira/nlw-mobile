import { ArrowArcLeft } from 'phosphor-react-native';
import React, { Children, useState } from 'react';
import {
    View,
    TextInput,
    Image,
    Text,
    TouchableOpacity,
    TouchableWithoutFeedback,
    Keyboard
} from 'react-native';
import { theme } from '../../theme';
import { FeedbackType } from '../../components/widget'
import { ScreenshotButton } from '../../components/screenshotButton'
import { captureScreen } from 'react-native-view-shot'
import { styles } from './styles';
import { feedbackTypes } from '../../utils/feedbackTypes'
import { Button } from '../button';
import { api } from '../../libs/api'
import * as FileSystem from 'expo-file-system'
interface Props {
    feedbackType: FeedbackType;
    onFeedbackCanceled: () => void;
    onFeedbackSent: () => void
}

export function Form({ feedbackType, onFeedbackCanceled, onFeedbackSent }: Props) {



    const [screenshot, setScreenshot] = useState<string | null>(null)
    const [comment, setComment] = useState('');
    const feedbackTypeInfo = feedbackTypes[feedbackType]
    function handleScreenshot() {
        captureScreen({
            format: 'jpg',
            quality: 0.8
        })
            .then(uri => setScreenshot(uri))
            .catch(error => console.log(error))
    }
    function handleScreenshotRemove() {
        setScreenshot(null)
    }
    const [isSendingFeedback, setIsSendingFeedback] = useState(false)
    async function handleSendFeedback() {
        if (isSendingFeedback) {
            return
        }
        setIsSendingFeedback(true)
        const screenshotBase64 = screenshot && FileSystem.readAsStringAsync(screenshot, { encoding: 'base64' })
        try {
            await api.post('feedbacks', {
                type: feedbackType,
                screenshot: `data:image/png;base64, ${screenshotBase64}`,
                comment: comment,
            });
            onFeedbackSent()
        } catch (error) {
            console.log(error)
            setIsSendingFeedback(false)
        }
    }

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity
                    onPress={onFeedbackCanceled}>
                    <ArrowArcLeft
                        size={24}
                        weight={"bold"}
                        color={theme.colors.text_secondary} />

                </TouchableOpacity>
                <View style={styles.titleContainer}>
                    <Image source={feedbackTypeInfo.image} style={styles.image} />
                    <Text style={styles.titleText}>
                        {feedbackTypeInfo.title}
                    </Text>
                </View>
            </View>
            <TextInput
                multiline
                autoCorrect={false}
                style={styles.input}
                onChangeText={setComment}
                placeholder='digite aqui'
                placeholderTextColor={theme.colors.text_secondary} />
            <View style={styles.footer}>
                <ScreenshotButton screenshot={screenshot}
                    onTakeShot={handleScreenshot}
                    onRemoveShot={handleScreenshotRemove} />
                <Button
                    isLoading={isSendingFeedback}
                    onPress={handleSendFeedback} />
            </View>
        </View>
    );
}