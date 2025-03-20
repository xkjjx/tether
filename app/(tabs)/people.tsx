import { useSQLiteContext } from "expo-sqlite";
import { useEffect, useState } from "react";
import { ThemedText } from "@/components/ThemedText";
import { ThemedScrollView } from "@/components/ThemedScrollView";
import { Person } from "@/models/models"

export default function PeopleScreen() {
    const db = useSQLiteContext();
    const [peoples, setPeoples] = useState<Person[]>([]);

    useEffect(() => {
        async function getPeoples() {
            const result = await db.getAllAsync<Person>('SELECT * FROM person');
            setPeoples(result);
        }

        getPeoples();
    })

    return (
        <ThemedScrollView contentContainerStyle={{alignItems: 'center', marginTop: 300}}>
            {peoples.map((item, index) => (
                <ThemedText key={index}>
                    {item.name}
                </ThemedText>
            ))}
        </ThemedScrollView>
    )
}