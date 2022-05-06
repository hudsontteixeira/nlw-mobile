import { ArrowArcLeft } from 'phosphor-react-native';
import React from 'react';
import {
    View,
    TextInput,
    Image,
    Text,
    TouchableOpacity
} from 'react-native';
import { theme } from '../../theme';
import { FeedbackType } from '../../components/widget'
import { styles } from './styles';
import { feedbackTypes } from '../../utils/feedbackTypes'

interface Props {
    feedbackType: FeedbackType
}

export function Form({ feedbackType }: Props) {
    const feedbackTypeInfo = feedbackTypes[feedbackType]
    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity>
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
        </View>
    );
}