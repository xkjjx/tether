import { Meeting} from "@/models/models";
import {ThemedText} from "@/components/ThemedText";
import {StyleSheet, View, Modal} from "react-native";
import {Pressable} from "expo-router/build/views/Pressable";
import { useState } from "react";
import NewMeetingModal from "@/components/NewMeetingModal";

type MeetingCardProps = {
    meeting: Meeting;
};

export default function MeetingCard({ meeting }: MeetingCardProps, key: number) {
    const [isModalVisible, setIsModalVisible] = useState(false);
    const modalProps = {isModalVisible, setIsModalVisible};

    return (
        <View key={key} style={styles.container}>
            <ThemedText style={styles.text}>
                {meeting.name}
            </ThemedText>
            <Pressable style={styles.addNote} onPress={() => setIsModalVisible(true)}>
                <ThemedText style={styles.plusSign}>
                    +
                </ThemedText>
            </Pressable>
            <NewMeetingModal {...modalProps}/>
        </View>
    )
}

const styles = StyleSheet.create(
    {
        container: {
            margin: 10,
            borderStyle: "solid",
            borderWidth: 1,
            borderRadius: 10,
            flexDirection: "row",
            height: 70,
            alignItems: "center",
            justifyContent: "center"
        },
        text: {
            margin: 10,
            fontSize: 25,
            flex: 4,
            alignItems: "center",
            justifyContent: "center",
            textAlign: "center"
        },
        addNote: {
            flex: 1,
            justifyContent: "center"
        },
        plusSign: {
            margin: 10,
            fontSize: 25,
            alignItems: "center",
            justifyContent: "center",
            textAlign: "center"
        }
    }
)
