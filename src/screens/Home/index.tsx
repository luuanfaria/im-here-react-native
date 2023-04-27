import { View, Text, TextInput, TouchableOpacity, FlatList, Alert } from "react-native";
import { styles } from "./styles";
import { Participant } from "../../components/Participant";
import { useState } from "react";

export default function Home() {
  const [participants, setParticipants] = useState<string[]>([]);
  const [participantName, setParticipantName] = useState<string>("");

  const handleParticipantAdd = () => {
    if (participants.includes(participantName)) {
      return Alert.alert("This participant has already been added");
    }

    setParticipants(prevState => [...participants, participantName]);
    setParticipantName("");
  }

  const handleParticipantRemove = (name: string) => {
    Alert.alert("Delete participant", `You are removing ${name} from participant list, continue?`, [
      {
        text: "Cancel",
        style: "cancel"
      },
      {
        text: "Yes",
        onPress: () => setParticipants(prevState => prevState.filter(participant => participant !== name))
      }
    ])
  }

  return (
    <View style={styles.container}>
      <Text style={styles.eventName}>Event name</Text>
      <Text style={styles.eventDate}>Event description</Text>

      <View style={styles.form}>
        <TextInput
          style={styles.input}
          placeholder="Participant name"
          placeholderTextColor="#6b6b6b"
          value={participantName}
          onChangeText={(text) => {
            setParticipantName(text)
          }}
        />

        <TouchableOpacity style={styles.button} onPress={handleParticipantAdd}>
          <Text style={styles.buttonText}>+</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={participants}
        keyExtractor={item => item}
        renderItem={({ item }) => (
          <Participant
            key={item}
            name={item}
            onRemove={() => handleParticipantRemove(item)}
          />
        )}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={() => (
          <Text style={styles.emptyList}>Participant list is empty. Add participants in your list.</Text>
        )}
      />

    </View>
  )
}