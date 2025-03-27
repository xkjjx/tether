import { useSQLiteContext } from "expo-sqlite";
import { useEffect, useState } from "react";
import { ThemedText } from "@/components/ThemedText";
import { ThemedScrollView } from "@/components/ThemedScrollView";
import { Meeting } from "@/models/models"
import { StyleSheet } from "react-native";
import Constants from "expo-constants";
import MeetingCard from "@/components/MeetingCard";

export default function UpcomingScreen() {
    const db = useSQLiteContext();
    const [meetings, setMeetings] = useState<Meeting[]>([]);

    useEffect(() => {
        async function getMeetings() {
            const result = await db.getAllAsync<Meeting>("SELECT * FROM meeting");
            setMeetings(result);
        }

        getMeetings();
    })

    return (
        <ThemedScrollView contentContainerStyle={styles.container}>
            <ThemedText style={styles.header}>
                Meetings
            </ThemedText>
            {
                meetings.map((item, index) => (
                    <MeetingCard meeting={item} key={index}/>
                ))
            }
        </ThemedScrollView>
    )
}

const styles = StyleSheet.create(
    {
        container: {
            paddingTop: Constants.statusBarHeight,
            flex: 1
        },
        header: {
            fontSize: 50,
            margin: 10,
            height: 60,
            paddingVertical: 30,
            textAlign: "center",
        }
    }
)