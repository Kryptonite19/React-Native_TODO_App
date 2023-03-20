import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { TextInput, Button, Text } from 'react-native-paper';
import DateTimePicker from '@react-native-community/datetimepicker';
import AsyncStorage from '@react-native-async-storage/async-storage';

function AddNewTaskScreen({ navigation , route }) {
  const { setTasks } = route.params;
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [dueDate, setDueDate] = useState(new Date());
  const [dueTime, setDueTime] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);

  const handleSave = async () => {

    // Merge the date and time into a single `Date` object
    const mergedDateTime = new Date(
      dueDate.getFullYear(),
      dueDate.getMonth(),
      dueDate.getDate(),
      dueTime.getHours(),
      dueTime.getMinutes()
    );
    const newTask = {
      id: Date.now().toString(),
      title: title,
      description: description,
      dueTime: mergedDateTime,
      completed: false
    };
    console.log('NEW TASK:', newTask);

    try {
      // Get existing tasks from AsyncStorage
      const tasks = await AsyncStorage.getItem('tasks');
      let tasksArray = [];

      if (tasks !== null) {
        tasksArray = JSON.parse(tasks);
        console.log('TASKS:', tasksArray);

      }

      // Add the new task to the tasks array
      tasksArray.push(newTask);

      // Save the updated tasks array back to AsyncStorage
      await AsyncStorage.setItem('tasks', JSON.stringify(tasksArray));
      // Update the tasks state with the new task
      setTasks(tasksArray);

    } catch (e) {
      console.log(e);
    }

    // Navigate back to the HomeScreen
    navigation.goBack();
  };

  const handleDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || dueDate;
    setShowDatePicker(false);
    setDueDate(currentDate);
  };

  const handleTimeChange = (event, selectedTime) => {
    const currentTime = selectedTime || dueTime;
    setShowTimePicker(false);
    setDueTime(currentTime);
  };

  return (
    <View style={styles.container}>
      <TextInput
        label="Task title"
        value={title}
        onChangeText={(text) => setTitle(text)}
        style={styles.input}
      />
      <TextInput
        label="Task description"
        value={description}
        onChangeText={(text) => setDescription(text)}
        style={styles.input}
        multiline
      />
      <Button onPress={() => setShowDatePicker(true)}>Select Due Date</Button>
      {showDatePicker && (
        <DateTimePicker
          value={dueDate}
          minimumDate={new Date()}
          mode="date"
          display="calendar"
          onChange={handleDateChange}
        />
      )}
      <Button onPress={() => setShowTimePicker(true)}>Select Due Time</Button>
      {showTimePicker && (
        <DateTimePicker
          value={dueTime}
          mode="time"
          display="clock"
          onChange={handleTimeChange}
        />
      )}
      <Button disabled={!title} onPress={handleSave}>
        Save
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  input: {
    marginBottom: 10,
  },
});

export default AddNewTaskScreen;
