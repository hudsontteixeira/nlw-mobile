import React from 'react';
import {
    View,
    TouchableOpacity,
    TouchableOpacityProps,
    Image,
    ImageProps,
    Text
} from 'react-native';
import { Copyright } from '../copyright';

import { styles } from './styles';
import { Option } from '../option';
import { feedbackTypes } from '../../utils/feedbackTypes'

interface Props extends TouchableOpacityProps {
    title: string;
    image: ImageProps
}

export function Options() {
    return (
        <View style={styles.container}
        >
            <Text style={styles.title}>
                Deixe o seu FeedBack
            </Text>
            <View style={styles.options}>
                {Object
                    .entries(feedbackTypes)
                    .map(([key, value]) => {
                        return (
                            <Option
                                key={key}
                                title={value.title}
                                image={value.image} />
                        )
                    })}
            </View>
            <Copyright />
        </View>
    );
}