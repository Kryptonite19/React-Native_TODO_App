import React, { useState, useEffect } from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { Card, Checkbox, Text } from 'react-native-paper';
import Icon from 'react-native-vector-icons/FontAwesome';
import AsyncStorage from '@react-native-async-storage/async-storage';

const TaskCard = ({ task, onDelete }) => {
  const [timeLeft, setTimeLeft] = useState('');
  const [completed, setCompleted] = useState(task.completed);

  const handleCheck = async () => {
    setCompleted(!completed);

    const storedTasks = await AsyncStorage.getItem('tasks');
    const tasks = storedTasks ? JSON.parse(storedTasks) : [];

    const updatedTasks = tasks.map(t => {
      if (t.id === task.id) {
        return { ...t, completed: !t.completed };
      } else {
        return t;
      }
    });

    await AsyncStorage.setItem('tasks', JSON.stringify(updatedTasks));
  };

  const handleDelete = () => {
    if (onDelete) {
      // call the onDelete prop function with the task ID
      onDelete(task.id);
    }
  };

  useEffect(() => {
    const intervalId = setInterval(() => {
      const dueTime = new Date(task.dueTime);
      const currentTime = new Date();
      const diffTime = dueTime - currentTime;

      if (diffTime < 0) {
        clearInterval(intervalId);
        setTimeLeft('Overdue');
      } else {
        const daysLeft = Math.floor(diffTime / (1000 * 60 * 60 * 24));
        const hoursLeft = Math.floor((diffTime / (1000 * 60 * 60)) % 24);
        const minutesLeft = Math.floor((diffTime / 1000 / 60) % 60);
        setTimeLeft(`${daysLeft}d ${hoursLeft}h ${minutesLeft}m`);
      }
    }, 500);

    return () => clearInterval(intervalId);
  }, [task]);

  return (
    <>
      <Card elevation={4} style={{ margin: 8 }}>
        <Card.Content style={styles.cardContent}>
          <View style={styles.topRow}>
            <Checkbox.Android
              status={completed ? 'checked' : 'unchecked'}
              onPress={handleCheck}
            />
            <Text style={styles.title}>{task.title}</Text>
            <TouchableOpacity onPress={handleDelete}>
              <Icon name="trash-o" size={24} color="#888" style={styles.deleteIcon}/>
            </TouchableOpacity>
          </View>
          <Text style={styles.description}>{task.description}</Text>
          <View style={styles.bottomRow}>
            <Icon name="clock-o" size={24} color="#888" />
            <Text style={styles.timeLeft} numberOfLines={1}>
              {timeLeft}
            </Text>
          </View>
        </Card.Content>
      </Card>
    </>
  );
};

const styles = StyleSheet.create({
  cardContent: {
    flexDirection: 'column',
  },
  topRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  bottomRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 16,
    flex: 1
  },
  description: {
    marginTop: 8,
    marginBottom: 8,
  },
  timeLeft: {
    fontSize: 16,
    color: '#888',
    marginLeft: 8,
  },
  editIcon: {
    flex: 0
  }
});

export default TaskCard;
