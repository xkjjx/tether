import { Meeting} from "@/models/models";
import {useSQLiteContext, SQLiteDatabase} from "expo-sqlite";
import {ThemedText} from "@/components/ThemedText";
import {StyleSheet, View, Modal} from "react-native";
import {Pressable} from "expo-router/build/views/Pressable";
import { useState } from "react";

type MeetingCardProps = {
    meeting: Meeting;
};

export default function MeetingCard({ meeting }: MeetingCardProps, key: number) {
    const db: SQLiteDatabase = useSQLiteContext();
    const [isModalVisible, setIsModalVisible] = useState(false);

    const escapeString = (str: string): string => {
        return str.replace(/'/g, "''");
    };

    async function addMeetingNotes(meetingId: number, notes: string): Promise<void> {

        const escapedNotes = escapeString(notes);

        const query = `
            UPDATE meeting
            SET notes = '${escapedNotes}'
            WHERE meeting_id = ${meetingId}
        `;

        await db.execAsync(query);
    }

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
            <Modal visible={isModalVisible} animationType={"slide"}>
            </Modal>
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
