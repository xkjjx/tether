import {Button, Modal, View} from "react-native";
import {StyleSheet} from "react-native";
import { Dispatch, SetStateAction} from "react";
import {ThemedText} from "@/components/ThemedText";
import Constants from "expo-constants";
import {SQLiteDatabase, useSQLiteContext} from "expo-sqlite";


type NewMeetingModalProps = {
    isModalVisible: boolean,
    setIsModalVisible: Dispatch<SetStateAction<boolean>>
}

export default function NewMeetingModal({isModalVisible, setIsModalVisible}: NewMeetingModalProps) {
    const db: SQLiteDatabase = useSQLiteContext();

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
            <Modal visible={isModalVisible} animationType={"slide"}>
                <View style={styles.container}>
                    <ThemedText style={styles.header}>
                        Add Meeting Notes
                    </ThemedText>
                    <ThemedText style={styles.content}>
                        Meeting content
                    </ThemedText>
                    <View style={styles.buttons}>
                        <View style={styles.button}>
                            <Button title={"Close"} onPress={() => setIsModalVisible(false)}/>
                        </View>
                        <View style={styles.button}>
                            <Button title={"Save"} onPress={() => {
                                setIsModalVisible(false);
                            }}/>
                        </View>
                    </View>
                </View>
            </Modal>
    )
}

const styles = StyleSheet.create(
    {
        container: {
            marginVertical: Constants.statusBarHeight * 2,
            flex: 1
        },
        header: {
            textAlign: "center",
            fontSize: 40,
            flex: 2,
            padding: 25,
        },
        content: {
            textAlign: "center",
            fontSize: 25,
            flex: 9
        },
        buttons: {
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "row",
            flex: 1
        },
        button: {
            flex: 1
        }
    }
)