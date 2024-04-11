const MONTH_NAMES = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];


function app() {

    return {
        month: '',
        year: '',
        no_of_days: [],
        blankdays: [],
        no_of_eventMonth: [],


        events: [
            {
                event_date: new Date(2024, 0, 23).toDateString(),
                event_title: "PQA General Orientation",
                event_venue: "PECC Gym",
                event_host: "OSAS",
                event_timeS: new Date(2024, 0, 23, 8, 0),
                event_timeE: new Date(2024, 0, 23, 0, 0),
                eventStatus: "Done",
                participants: "All Students",
            },
            {
                event_date: new Date(2024, 2, 22).toDateString(),
                event_title: "BSIT Technofest 2024",
                event_venue: "PECC Gym",
                event_host: "SITS",
                event_timeS: new Date(2024, 2, 22, 8, 0),
                event_timeE: new Date(2024, 2, 22, 16, 0),
                eventStatus: "Done",
                participants: "Society of Information Technology Students",
            },
            {
                event_date: new Date(2023, 11, 12).toDateString(),
                event_title: "Paskuhan 2023",
                event_venue: "USeP Tagum Campus",
                event_host: "TSC",
                event_timeS: new Date(2023, 11, 12, 17, 0),
                event_timeE: new Date(2023, 11, 12, 19, 0),
                eventStatus: "Done",
                participants: "All Students",
            }
        ],

        sortEvents: function() {
            this.events.sort(function(a, b) {
                var dateA = new Date(a.event_date);
                var dateB = new Date(b.event_date);
                return dateA - dateB;
            });
        },



        event_title: '',
        event_date: '',
        event_venue: '',
        event_timeS: '',
        event_timeE: '',

        openEventModal: false,




        initDate() {
            let today = new Date();
            this.month = today.getMonth();
            this.year = today.getFullYear();
            this.getNoOfDays();
        },

        isToday(date) {
            const today = new Date();
            const d = new Date(this.year, this.month, date);

            return today.toDateString() === d.toDateString();
        },

        hasEvent(date) {
            const d = new Date(this.year, this.month, date);
            return this.events.find(e => e.event_date === d.toDateString());
        },


        countEvent(date) {
            const d = new Date(this.year, this.month, date);
            return this.events.filter(e => e.event_date === d.toDateString()).length;
        },




        showEventModal(date) {
            this.event_date = new Date(this.year, this.month, date).toDateString();
            var x = 0;
            while (x <= this.events.length) {
                if (this.events[x] && this.events[x].event_date === this.event_date) {
                    // open the modal
                    this.openEventModal = true;
                    var i = 0;
                    while (i <= this.events.length) {
                        if (this.events[i] && this.events[i].event_date === this.event_date) {
                            this.event_title = this.events[i].event_title;
                            this.event_venue = this.events[i].event_venue;
                            this.event_timeS = this.formatTime(this.events[i].event_timeS);
                            this.event_timeE = this.formatTime(this.events[i].event_timeE);
                            this.participants = this.events[i].participants;
                            this.eventStatus = this.events[i].eventStatus;
                            break;
                        } else {
                            this.event_title = '';
                        }
                        i++;
                    }
                    break;
                } else {
                    this.openEventModal = false;
                }
                x++;
            }
        },


        showEventModalORG(date) {
            this.event_date = new Date(this.year, this.month, date).toDateString();
            for (let x = 0; x <= this.events.length; x++) {
                if (this.events[x] && this.events[x].event_date === this.event_date && (this.events[x].event_host === "OSAS" || this.events[x].event_host === "SITS" || this.events[x].event_host === "TSC")) {
                    // open the modal
                    this.openEventModal = true;
                    for (let i = 0; i <= this.events.length; i++) {
                        if (this.events[i] && this.events[i].event_date === this.event_date) {
                            this.event_title = this.events[i].event_title;
                            this.event_venue = this.events[i].event_venue;
                            this.event_timeS = this.formatTime(this.events[i].event_timeS);
                            this.event_timeE = this.formatTime(this.events[i].event_timeE);
                            this.participants = this.events[i].participants;
                            this.eventStatus = this.events[i].eventStatus;
                            break;
                        } else {
                            this.event_title = '';
                        }
                    }
                    break;
                } else {
                    this.openEventModal = false;
                }
            }
        },




        closeModal() {
            //close the modal
            this.openEventModal = false;
        },


        getNoOfDays() {
            let daysInMonth = new Date(this.year, this.month + 1, 0).getDate();

            // find where to start calendar day of week
            let dayOfWeek = new Date(this.year, this.month).getDay();

            let blankdaysArray = [];
            for (let i = 1; i <= dayOfWeek; i++) {
                blankdaysArray.push(i);
            }

            let daysArray = [];
            for (let i = 1; i <= daysInMonth; i++) {
                daysArray.push(i);
            }

            let eventCounts = [];
            for (let i = 1; i <= daysInMonth; i++) {
                let count = this.countEvent(i);
                if (count === 1) {
                    eventCounts.push(count);
                }
            }




            this.blankdays = blankdaysArray;
            this.no_of_days = daysArray;
            this.no_of_eventMonth = eventCounts;



        },

        formatTime(time) {
            const eventTime = new Date(time);
            const hours = eventTime.getHours();
            const minutes = eventTime.getMinutes();
            const ampm = hours >= 12 ? 'PM' : 'AM';
            const formattedHours = hours % 12 || 12;
            const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;

            return `${formattedHours}:${formattedMinutes} ${ampm}`;
        },
        getOrdinalSuffix(day) {
            if (day > 3 && day < 21) return 'th';
            switch (day % 10) {
                case 1:
                    return 'st';
                case 2:
                    return 'nd';
                case 3:
                    return 'rd';
                default:
                    return 'th';
            }
        },

        formatDateAndTime(date, time) {
            const eventDate = new Date(date);
            const monthName = MONTH_NAMES[eventDate.getMonth()];
            const day = eventDate.getDate();
            const year = eventDate.getFullYear();

            const eventTime = new Date(time);
            const hours = eventTime.getHours();
            const minutes = eventTime.getMinutes();
            const ampm = hours >= 12 ? 'PM' : 'AM';
            const formattedHours = hours % 12 || 12;
            const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;

            return `${monthName} ${day}${this.getOrdinalSuffix(day)}, ${year} at ${formattedHours}:${formattedMinutes} ${ampm}`;
        },



        getEventTitle(date) {
            let event_date = new Date(this.year, this.month, date).toDateString();
            let x = 0;
            while (x <= this.events.length) {
                if (this.events[x] && this.events[x].event_date === event_date) {
                    let i = 0;
                    while (i <= this.events.length) {
                        if (this.events[i] && this.events[i].event_date === event_date) {
                            this.event_title = this.events[i].event_title;
                            return this.event_title;
                        }
                        i++;
                    }
                    break;
                }
                x++;
            }
        },

        getEventHost(date) {
            let event_date = new Date(this.year, this.month, date).toDateString();
            let x = 0;
            while (x <= this.events.length) {
                if (this.events[x] && this.events[x].event_date === event_date) {
                    let i = 0;
                    while (i <= this.events.length) {
                        if (this.events[i] && this.events[i].event_date === event_date) {
                            this.event_host = this.events[i].event_host;
                            return this.event_host;
                        }
                        i++;
                    }
                    break;
                }
                x++;
            }
        },

        getEventParticipants(date) {
            let event_date = new Date(this.year, this.month, date).toDateString();
            let x = 0;
            while (x <= this.events.length) {
                if (this.events[x] && this.events[x].event_date === event_date) {
                    let i = 0;
                    while (i <= this.events.length) {
                        if (this.events[i] && this.events[i].event_date === event_date) {
                            this.participants = this.events[i].participants;
                            return this.participants;
                        }
                        i++;
                    }
                    break;
                }
                x++;
            }
        },



        getEventDate(date) {
            let event_date = new Date(this.year, this.month, date).toDateString();
            let x = 0;
            while (x <= this.events.length) {
                if (this.events[x] && this.events[x].event_date === event_date) {
                    let i = 0;
                    while (i <= this.events.length) {
                        if (this.events[i] && this.events[i].event_date === event_date) {
                            return this.formatDateAndTime(event_date, this.events[i].event_timeS);
                        }
                        i++;
                    }
                    break;
                }
                x++;
            }
        },

        getEventVenue(date) {
            let event_date = new Date(this.year, this.month, date).toDateString();
            let x = 0;
            while (x <= this.events.length) {
                if (this.events[x] && this.events[x].event_date === event_date) {
                    let i = 0;
                    while (i <= this.events.length) {
                        if (this.events[i] && this.events[i].event_date === event_date) {
                            this.event_venue = this.events[i].event_venue;
                            return this.event_venue;
                        }
                        i++;
                    }
                    break;
                }
                x++;
            }
        }

    }
}

const myApp = app();
myApp.sortEvents();
