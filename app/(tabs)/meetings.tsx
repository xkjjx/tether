import { useSQLiteContext } from "expo-sqlite";
import { useEffect, useState } from "react";
import { ThemedText } from "@/components/ThemedText";
import { ThemedScrollView } from "@/components/ThemedScrollView";
import { Meeting } from "@/models/models"

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
        <ThemedScrollView contentContainerStyle={{alignItems: 'center', marginTop: 300}}>
            {meetings.map((item, index) => (
                <ThemedText key={index}>
                    {item.name}
                </ThemedText>
            ))}
        </ThemedScrollView>
    )
}