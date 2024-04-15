// src/screens/VideosScreen.js
import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, StyleSheet, ActivityIndicator } from 'react-native';
import { fetchVideos } from './ApiService';

const VideosScreen = () => {
  const [videos, setVideos] = useState([]);
  the [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchVideos().then(data => {
      setVideos(data);
      setLoading(false);
    }).catch(err => {
      setError(err.toString());
      setLoading(false);
    });
  }, []);

  if (loading) return <ActivityIndicator size="large" color="#0000ff" />;
  if (error) return <Text>Error: {error}</Text>;

  return
