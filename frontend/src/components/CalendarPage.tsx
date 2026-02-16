'use client';

import { useState } from 'react';
import { ChevronLeft, ChevronRight, Calendar as CalendarIcon, Clock, Users } from 'lucide-react';

interface Event {
  id: string;
  title: string;
  date: Date;
  time: string;
  type: 'meeting' | 'review' | 'deadline' | 'sprint';
  participants?: string[];
}

export default function CalendarPage() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  const events: Event[] = [
    {
      id: '1',
      title: 'Sprint Planning',
      date: new Date(2024, 2, 18),
      time: '10:00 AM',
      type: 'meeting',
      participants: ['Alice', 'Bob', 'Charlie']
    },
    {
      id: '2',
      title: 'Code Review',
      date: new Date(2024, 2, 19),
      time: '2:00 PM',
      type: 'review',
      participants: ['Alice', 'Bob']
    },
    {
      id: '3',
      title: 'Project Deadline',
      date: new Date(2024, 2, 25),
      time: '11:59 PM',
      type: 'deadline'
    },
    {
      id: '4',
      title: 'Sprint Retrospective',
      date: new Date(2024, 2, 22),
      time: '3:00 PM',
      type: 'meeting',
      participants: ['Alice', 'Bob', 'Charlie']
    }
  ];

  const getDaysInMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  };

  const prevMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
  };

  const nextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
  };

  const getEventColor = (type: string) => {
    switch(type) {
      case 'meeting': return '#ffde22';
      case 'review': return '#ff8928';
      case 'deadline': return '#ff414e';
      default: return '#ffde22';
    }
  };

  const daysInMonth = getDaysInMonth(currentDate);
  const firstDay = getFirstDayOfMonth(currentDate);
  const days = [];

  for (let i = 0; i < firstDay; i++) {
    days.push(<div key={`empty-${i}`} style={{ padding: '0.5rem' }} />);
  }

  for (let i = 1; i <= daysInMonth; i++) {
    const date = new Date(currentDate.getFullYear(), currentDate.getMonth(), i);
    const dayEvents = events.filter(e => e.date.toDateString() === date.toDateString());
    
    days.push(
      <div
        key={i}
        onClick={() => setSelectedDate(date)}
        style={{
          padding: '0.5rem',
          background: selectedDate?.toDateString() === date.toDateString() ? 'rgba(255,222,34,0.1)' : 'transparent',
          border: '1px solid rgba(255,222,34,0.1)',
          borderRadius: '0.5rem',
          minHeight: '80px',
          cursor: 'pointer',
          transition: 'all 0.2s ease'
        }}
        onMouseEnter={(e) => {
          if (selectedDate?.toDateString() !== date.toDateString()) {
            e.currentTarget.style.background = 'rgba(255,255,255,0.02)';
          }
        }}
        onMouseLeave={(e) => {
          if (selectedDate?.toDateString() !== date.toDateString()) {
            e.currentTarget.style.background = 'transparent';
          }
        }}
      >
        <span style={{ fontSize: '0.875rem', color: 'rgba(255,255,255,0.8)' }}>{i}</span>
        {dayEvents.map(event => (
          <div
            key={event.id}
            style={{
              marginTop: '0.25rem',
              padding: '0.125rem 0.25rem',
              background: `${getEventColor(event.type)}20`,
              borderLeft: `2px solid ${getEventColor(event.type)}`,
              borderRadius: '2px',
              fontSize: '0.7rem',
              color: '#fff',
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis'
            }}
          >
            {event.title}
          </div>
        ))}
      </div>
    );
  }

  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '2rem' }}>
        <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', margin: 0 }}>Team Calendar</h2>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <button
            onClick={prevMonth}
            style={{
              padding: '0.5rem',
              background: 'transparent',
              border: '1px solid rgba(255,222,34,0.3)',
              borderRadius: '0.5rem',
              color: '#fff',
              cursor: 'pointer'
            }}
          >
            <ChevronLeft size={20} />
          </button>
          <span style={{ fontSize: '1.125rem', fontWeight: '600' }}>
            {currentDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
          </span>
          <button
            onClick={nextMonth}
            style={{
              padding: '0.5rem',
              background: 'transparent',
              border: '1px solid rgba(255,222,34,0.3)',
              borderRadius: '0.5rem',
              color: '#fff',
              cursor: 'pointer'
            }}
          >
            <ChevronRight size={20} />
          </button>
        </div>
      </div>

      <div style={{
        background: 'rgba(255,255,255,0.02)',
        border: '1px solid rgba(255,222,34,0.1)',
        borderRadius: '1rem',
        padding: '1.5rem'
      }}>
        {/* Week days header */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '0.5rem', marginBottom: '1rem' }}>
          {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
            <div key={day} style={{ textAlign: 'center', color: 'rgba(255,255,255,0.6)', fontSize: '0.875rem' }}>
              {day}
            </div>
          ))}
        </div>

        {/* Calendar grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '0.5rem' }}>
          {days}
        </div>
      </div>

      {/* Selected date events */}
      {selectedDate && (
        <div style={{
          marginTop: '2rem',
          padding: '1.5rem',
          background: 'rgba(255,255,255,0.02)',
          border: '1px solid rgba(255,222,34,0.1)',
          borderRadius: '1rem'
        }}>
          <h3 style={{ fontSize: '1.125rem', fontWeight: '600', marginBottom: '1rem' }}>
            Events for {selectedDate.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
          </h3>
          
          {events.filter(e => e.date.toDateString() === selectedDate.toDateString()).length === 0 ? (
            <p style={{ color: 'rgba(255,255,255,0.6)', textAlign: 'center', padding: '2rem' }}>
              No events scheduled for this day
            </p>
          ) : (
            events
              .filter(e => e.date.toDateString() === selectedDate.toDateString())
              .map(event => (
                <div
                  key={event.id}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '1rem',
                    marginBottom: '0.5rem',
                    background: `${getEventColor(event.type)}10`,
                    borderRadius: '0.75rem'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    <div style={{
                      width: '2rem',
                      height: '2rem',
                      borderRadius: '0.5rem',
                      background: `${getEventColor(event.type)}20`,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}>
                      <CalendarIcon size={16} style={{ color: getEventColor(event.type) }} />
                    </div>
                    <div>
                      <h4 style={{ fontWeight: '600', margin: 0 }}>{event.title}</h4>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginTop: '0.25rem' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                          <Clock size={12} style={{ color: 'rgba(255,255,255,0.4)' }} />
                          <span style={{ fontSize: '0.875rem', color: 'rgba(255,255,255,0.6)' }}>{event.time}</span>
                        </div>
                        {event.participants && (
                          <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                            <Users size={12} style={{ color: 'rgba(255,255,255,0.4)' }} />
                            <span style={{ fontSize: '0.875rem', color: 'rgba(255,255,255,0.6)' }}>
                              {event.participants.join(', ')}
                            </span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))
          )}
        </div>
      )}
    </div>
  );
}