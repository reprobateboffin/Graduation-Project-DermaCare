import React, { useMemo, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
  StatusBar,
  Dimensions,
  Platform,
} from 'react-native';
import { colors } from '../../theme/colors';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../navigation/types';
import moment from 'moment';

type YearlyCalendarScreenNavigationProp = NativeStackNavigationProp<RootStackParamList>;

const { width } = Dimensions.get('window');
const GRID_MARGIN = 16;
const GRID_GAP = 16;
const CARD_WIDTH = (width - (GRID_MARGIN * 2) - GRID_GAP) / 2;

const YearlyCalendarScreen: React.FC = () => {
  const navigation = useNavigation<YearlyCalendarScreenNavigationProp>();
  const [selectedYear, setSelectedYear] = useState(moment().year());

  const years = useMemo(() => {
    const currentYear = moment().year();
    return [currentYear - 2, currentYear - 1, currentYear, currentYear + 1, currentYear + 2];
  }, []);

  const months = useMemo(() => [
    { name: 'Jan', days: 31 },
    { name: 'Feb', days: moment().year(selectedYear).month(1).daysInMonth() },
    { name: 'Mar', days: 31 },
    { name: 'Apr', days: 30 },
    { name: 'May', days: 31 },
    { name: 'Jun', days: 30 },
    { name: 'Jul', days: 31 },
    { name: 'Aug', days: 31 },
    { name: 'Sep', days: 30 },
    { name: 'Oct', days: 31 },
    { name: 'Nov', days: 30 },
    { name: 'Dec', days: 31 },
  ], [selectedYear]);

  const handleMonthSelect = (monthIndex: number) => {
    const selectedDate = moment().year(selectedYear).month(monthIndex).format('YYYY-MM-DD');
    navigation.navigate('DashboardEventsScreen', { selectedDate });
  };

  const handleYearChange = (year: number) => {
    setSelectedYear(year);
  };

  const renderHeader = () => (
    <View style={styles.header}>
      <TouchableOpacity 
        style={styles.headerButton}
        onPress={() => navigation.goBack()}
      >
        <Ionicons name="chevron-back" size={24} color="white" />
      </TouchableOpacity>
      <Text style={styles.yearText}>{selectedYear}</Text>
      <View style={styles.headerRight}>
        <TouchableOpacity style={styles.headerButton}>
          <Ionicons name="search" size={24} color="white" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.headerButton}>
          <Ionicons name="add" size={24} color="white" />
        </TouchableOpacity>
      </View>
    </View>
  );

  const renderMonth = (monthName: string, monthIndex: number) => {
    const startDay = moment().year(selectedYear).month(monthIndex).startOf('month').day();
    const totalDays = months[monthIndex].days;
    const days = [];

    // Empty days
    for (let i = 0; i < startDay; i++) {
      days.push(<Text key={`empty-${i}`} style={styles.dayText}> </Text>);
    }

    // Days of month
    for (let i = 1; i <= totalDays; i++) {
      const isToday = moment().year(selectedYear).month(monthIndex).date(i).isSame(moment(), 'day');
      days.push(
        <Text
          key={i}
          style={[
            styles.dayText,
            isToday && styles.todayText,
          ]}
        >
          {i}
        </Text>
      );
    }

    return (
      <TouchableOpacity 
        style={styles.monthContainer} 
        key={monthName}
        onPress={() => handleMonthSelect(monthIndex)}
      >
        <Text style={styles.monthName}>{monthName}</Text>
        <View style={styles.calendarGrid}>
          {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((day, index) => (
            <Text key={`header-${index}`} style={styles.weekDayText}>
              {day}
            </Text>
          ))}
          {days}
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <StatusBar 
        barStyle="light-content" 
        backgroundColor={colors.base.darkGray}
        translucent
      />
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.content}>
          {renderHeader()}
          <ScrollView 
            style={styles.scrollContent}
            showsVerticalScrollIndicator={false}
          >
            <View style={styles.yearSelector}>
              {years.map((year) => (
                <TouchableOpacity
                  key={year}
                  style={[
                    styles.yearButton,
                    selectedYear === year && styles.selectedYearButton
                  ]}
                  onPress={() => handleYearChange(year)}
                >
                  <Text style={[
                    styles.yearButtonText,
                    selectedYear === year && styles.selectedYearButtonText
                  ]}>
                    {year}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
            <View style={styles.monthsGrid}>
              {months.map((month, index) => renderMonth(month.name, index))}
            </View>
          </ScrollView>
        </View>
      </SafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.base.darkGray,
  },
  safeArea: {
    flex: 1,
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
  content: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255,255,255,0.1)',
  },
  headerButton: {
    padding: 8,
    borderRadius: 8,
  },
  yearText: {
    fontSize: 20,
    fontWeight: '600',
    color: colors.base.white,
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  scrollContent: {
    flex: 1,
  },
  yearSelector: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  yearButton: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    backgroundColor: 'rgba(255,255,255,0.1)',
  },
  selectedYearButton: {
    backgroundColor: colors.secondary.red,
  },
  yearButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.base.white,
    opacity: 0.7,
  },
  selectedYearButtonText: {
    opacity: 1,
  },
  monthsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: GRID_MARGIN,
    gap: GRID_GAP,
  },
  monthContainer: {
    width: CARD_WIDTH,
    backgroundColor: colors.base.black,
    borderRadius: 16,
    padding: 12,
    marginBottom: 16,
  },
  monthName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.base.white,
    marginBottom: 16,
  },
  calendarGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 4,
  },
  weekDayText: {
    width: '14%',
    textAlign: 'center',
    color: 'rgba(255,255,255,0.5)',
    fontSize: 10,
    marginBottom: 8,
  },
  dayText: {
    width: '14%',
    textAlign: 'center',
    color: colors.base.white,
    fontSize: 10,
    paddingVertical: 2,
  },
  todayText: {
    color: colors.secondary.red,
    fontWeight: 'bold',
  },
});

export default YearlyCalendarScreen; 