import React, { useState } from 'react';
import {
    ScrollView,
    View,
    KeyboardAvoidingView,
    Dimensions,
    NativeSyntheticEvent,
    NativeScrollEvent,
} from 'react-native';
import MainScreen from './MainScreen';
import DashboardScreen from './DashboardScreen';
import AnnouncementScreen from './AnnouncementScreen';
import { useNavigation } from '@react-navigation/native';
import styles from '../css/HomeScreen';

const SCREEN_WIDTH = Dimensions.get('window').width;

const HomeScreen = () => {
    const navigation = useNavigation();
    const [activeIndex, setActiveIndex] = useState(0);

    const pages = [
        { id: 'main', component: MainScreen },
        { id: 'dashboard', component: DashboardScreen },
        { id: 'announcement', component: AnnouncementScreen },
    ];

    const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
        const scrollX = event.nativeEvent.contentOffset.x;
        const newIndex = Math.round(scrollX / SCREEN_WIDTH);
        setActiveIndex(newIndex);
    };

    return (
        <View style={styles.container}>
            <KeyboardAvoidingView behavior="padding" style={{ flex: 1 }}>
            <ScrollView
                horizontal
                pagingEnabled
                showsHorizontalScrollIndicator={false}
                style={styles.scrollView}
                onScroll={handleScroll}
                scrollEventThrottle={16}
            >
                {pages.map((page) => (
                    <View key={page.id} style={styles.page}>
                        <page.component navigation={navigation} />
                    </View>
                ))}
            </ScrollView>
            </KeyboardAvoidingView>
            
            <View style={styles.pagination}>
                {pages.map((_, index) => (
                    <View
                        key={index}
                        style={[
                            styles.dot,
                            activeIndex === index ? styles.activeDot : styles.inactiveDot,
                        ]}
                    />
                ))}
            </View>
        </View>
    );
};

export default HomeScreen;
