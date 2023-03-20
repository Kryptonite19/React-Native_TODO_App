import React, { useState, useEffect } from 'react';
import { StyleSheet, View, FlatList } from 'react-native';
import { FAB, Text } from 'react-native-paper';
import TaskCard from '../components/TaskCard';
import AsyncStorage from '@react-native-async-storage/async-storage';

function HomeScreen({ navigation }) {
  const [tasks, setTasks] = useState([]);

  // useEffect hook to retrieve data from async storage on component mount
  useEffect(() => {
    async function fetchData() {
      try {
        const jsonValue = await AsyncStorage.getItem('tasks');
        console.log(jsonValue)
        if (jsonValue !== null) {
          setTasks(JSON.parse(jsonValue));
        }
      } catch (e) {
        console.error(e);
      }
    }
    fetchData();
  }, []);
  const deleteTask = (taskId) => {
    setTasks((prevTasks) => {
      const updatedTasks = prevTasks.filter((task) => task.id !== taskId);
      AsyncStorage.setItem('tasks', JSON.stringify(updatedTasks));
      return updatedTasks;
    });
  };

  return (

    <View style={styles.container}>
      {tasks.length > 0 ? (
        <FlatList
          data={tasks}
          renderItem={({ item: task }) => <TaskCard task={task} onDelete={deleteTask} />}
          keyExtractor={(item) => item.id}
        />
      ) : (
        <Text>No tasks found</Text>
      )}
      <FAB
        style={{
          position: 'absolute',
          borderRadius: 30,
          backgroundColor: '#6750a4',
          margin: 16,
          right: 0,
          bottom: 0,
        }}
        icon="plus"
        onPress={() => navigation.navigate('AddNewTask', { setTasks })}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default HomeScreen;
