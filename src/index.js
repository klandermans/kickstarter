import React,
{
    useState,
    useEffect
} from 'react';
import {
    Plus,
    BookOpen,
    Brain,
    Calendar,
    Settings,
    Mic,
    Camera,
    CheckCircle,
    Sun,
    Moon,
    ArrowLeft,
    Share2,
    User,
    LogOut,
    Award
} from 'lucide-react';

// Hulpfunctie voor consistente kleuren
const subjectColors = {
    'Wiskunde': 'bg-blue-200 text-blue-800',
    'Geschiedenis': 'bg-amber-200 text-amber-800',
    'Engels': 'bg-rose-200 text-rose-800',
    'Biologie': 'bg-green-200 text-green-800',
    'Nederlands': 'bg-indigo-200 text-indigo-800',
    'Algemeen': 'bg-gray-200 text-gray-800',
};

// Voorbeelddata om de app te vullen
const exampleTasks = [{
    id: 1,
    subject: 'Wiskunde',
    title: 'Paragraaf 3.1 maken',
    deadline: '2025-06-23',
    status: 'todo',
    subtasks: [{
        id: 11,
        title: '15 sommen maken',
        done: false
    }]
}, {
    id: 2,
    subject: 'Geschiedenis',
    title: 'Hoofdstuk 3 leren',
    deadline: '2025-06-27',
    status: 'todo',
    subtasks: [{
        id: 21,
        title: 'Samenvatten',
        done: false
    }, {
        id: 22,
        title: 'Flashcards maken',
        done: false
    }, {
        id: 23,
        title: 'Toets oefenen',
        done: false
    }]
}, {
    id: 3,
    subject: 'Engels',
    title: 'Presentatie voorbereiden',
    deadline: '2025-07-04',
    status: 'todo',
    subtasks: [{
        id: 31,
        title: 'Script schrijven',
        done: false
    }, {
        id: 32,
        title: 'Slides maken',
        done: false
    }, {
        id: 33,
        title: 'Oefenen',
        done: false
    }]
}, ];

// Component: Inlogscherm
const LoginScreen = ({ onLogin }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = (e) => {
        e.preventDefault();
        // Simuleer een succesvolle login
        if (email && password) {
            onLogin();
        } else {
            alert("Vul alsjeblieft je e-mail en wachtwoord in.");
        }
    };
    
    return (
        <div className="min-h-screen bg-slate-100 dark:bg-slate-900 flex flex-col justify-center items-center p-4">
            <div className="w-full max-w-sm">
                <div className="flex justify-center items-center mb-6">
                    <Brain className="h-12 w-12 text-blue-500" />
                    <h1 className="text-4xl font-bold ml-3 text-slate-800 dark:text-white">MindMapr</h1>
                </div>
                <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg p-8">
                    <h2 className="text-2xl font-bold text-center text-slate-800 dark:text-white mb-6">Inloggen</h2>
                    <form onSubmit={handleLogin} className="space-y-6">
                        <div>
                            <label className="block text-sm font-medium text-slate-600 dark:text-slate-300 mb-1">E-mail</label>
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="jouw.email@school.nl"
                                className="w-full p-3 bg-slate-100 dark:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-slate-600 dark:text-slate-300 mb-1">Wachtwoord</label>
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="••••••••"
                                className="w-full p-3 bg-slate-100 dark:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                            />
                        </div>
                        <button
                            type="submit"
                            className="w-full bg-blue-500 text-white font-bold py-3 px-4 rounded-lg hover:bg-blue-600 transition-colors shadow-lg"
                        >
                            Log in
                        </button>
                    </form>
                </div>
                <p className="text-center text-sm text-slate-500 mt-6">
                    Nog geen account? <a href="#" className="font-semibold text-blue-500 hover:underline">Registreer hier</a>.
                </p>
            </div>
        </div>
    );
};


// Component: Taak-kaart in de Mindmap
const TaskNode = ({
    task,
    onToggleSubtask
}) => {
    const colorClass = subjectColors[task.subject] || subjectColors['Algemeen'];
    const completedSubtasks = task.subtasks.filter(st => st.done).length;
    const progress = (completedSubtasks / task.subtasks.length) * 100;

    return (
        <div className = "bg-white dark:bg-slate-800 rounded-2xl shadow-lg p-4 w-64 transform hover:scale-105 transition-transform duration-200" >
        <div className = "flex justify-between items-start" >
        <span className = {
            `${colorClass} text-xs font-semibold mr-2 px-2.5 py-0.5 rounded-full`
        } > {
            task.subject
        } </span> <
        span className = "text-xs text-gray-500 dark:text-gray-400" > Deadline: {
            new Date(task.deadline).toLocaleDateString('nl-NL', {
                day: 'numeric',
                month: 'long'
            })
        } </span> </div> <
        h3 className = "text-lg font-bold mt-2 text-slate-800 dark:text-white" > {
            task.title
        } </h3> <
        div className = "mt-3 space-y-2" > {
            task.subtasks.map(subtask => ( <
                label key = {
                    subtask.id
                }
                className = "flex items-center space-x-3 cursor-pointer" >
                <
                input type = "checkbox"
                checked = {
                    subtask.done
                }
                onChange = {
                    () => onToggleSubtask(task.id, subtask.id)
                }
                className = "form-checkbox h-5 w-5 rounded text-blue-500 bg-gray-200 dark:bg-slate-700 border-transparent focus:ring-blue-500" /
                >
                <
                span className = {
                    `text-slate-600 dark:text-slate-300 ${subtask.done ? 'line-through text-opacity-50' : ''}`
                } > {
                    subtask.title
                } </span> </label>
            ))
        } </div> {
            task.subtasks.length > 0 && ( <
                div className = "mt-4" >
                <
                div className = "w-full bg-gray-200 dark:bg-slate-700 rounded-full h-2.5" >
                <
                div className = "bg-blue-500 h-2.5 rounded-full"
                style = {
                    {
                        width: `${progress}%`
                    }
                } > </div> </div> </div>
            )
        } </div>
    );
};

// Component: Mindmap Weergave
const MindmapView = ({
    tasks,
    onToggleSubtask
}) => ( <
    div className = "p-4 md:p-8" >
    <
    h2 className = "text-2xl md:text-3xl font-bold text-slate-800 dark:text-white mb-6 flex items-center" >
    <
    Brain className = "mr-3 text-blue-500" / > Jouw Visuele Plan </h2> <
    div className = "flex flex-wrap gap-8 justify-center" > {
        tasks.map(task => ( <
            TaskNode key = {
                task.id
            }
            task = {
                task
            }
            onToggleSubtask = {
                onToggleSubtask
            }
            />
        ))
    } </div> </div>
);

// Component: Planning Tijdlijn
const PlanningTimeline = ({
    tasks,
    weekTempo
}) => {
    const getWeekDays = () => {
        const days = [];
        const today = new Date('2025-06-23T12:00:00'); // Vaste datum voor consistentie
        for (let i = 0; i < 7; i++) {
            const date = new Date(today);
            date.setDate(today.getDate() + i);
            days.push(date);
        }
        return days;
    };

    const weekDays = getWeekDays();

    return ( <
        div className = "p-4 md:p-8 mt-8" >
        <
        h2 className = "text-2xl md:text-3xl font-bold text-slate-800 dark:text-white mb-6 flex items-center" >
        <
        Calendar className = "mr-3 text-green-500" / > Jouw Week </h2> <
        div className = "grid grid-cols-1 md:grid-cols-7 gap-4" > {
            weekDays.map(date => {
                const dayName = date.toLocaleDateString('nl-NL', {
                    weekday: 'long'
                }).toLowerCase();
                const dayTasks = tasks.filter(t => new Date(t.deadline).toDateString() === date.toDateString());
                const tempo = weekTempo[dayName];

                return ( <
                    div key = {
                        date
                    }
                    className = "bg-white dark:bg-slate-800 rounded-2xl p-4 shadow" >
                    <
                    h3 className = "font-bold text-slate-800 dark:text-white" > {
                        date.toLocaleDateString('nl-NL', {
                            weekday: 'long',
                            day: 'numeric'
                        })
                    } </h3> <
                    p className = "text-sm text-gray-500 dark:text-gray-400 mb-3" > {
                        tempo > 0 ? `${tempo} min focus` : 'Vrije dag'
                    } </p> <
                    div className = "space-y-2" > {
                        dayTasks.length > 0 ? (
                            dayTasks.map(task => ( <
                                div key = {
                                    task.id
                                }
                                className = {
                                    `${subjectColors[task.subject] || subjectColors['Algemeen']} rounded-lg p-2 text-sm`
                                } >
                                {
                                    task.title
                                } </div>
                            ))
                        ) : ( <
                            p className = "text-sm text-gray-400 dark:text-gray-500 italic" > Geen taken.Nice! </p>
                        )
                    } </div> </div>
                );
            })
        } </div> </div>
    );
};

// Component: Taak Toevoegen Modal
const AddTaskModal = ({
    onClose,
    onAddTask
}) => {
    const [
        step, setStep
    ] = useState(1);
    const [
        inputType, setInputType
    ] = useState(null);
    const [
        taskTitle, setTaskTitle
    ] = useState("");
    const [
        taskSubject, setTaskSubject
    ] = useState("Algemeen");
    const [
        taskDeadline, setTaskDeadline
    ] = useState("");

    const handleAddTask = () => {
        if (!taskTitle || !taskDeadline) {
            alert("Vul alsjeblieft een titel en deadline in.");
            return;
        }
        const newTask = {
            id: Date.now(),
            subject: taskSubject,
            title: taskTitle,
            deadline: taskDeadline,
            status: 'todo',
            // Simpele opsplitsing
            subtasks: [{
                id: Date.now() + 1,
                title: 'Stap 1: Beginnen',
                done: false
            }, {
                id: Date.now() + 2,
                title: 'Stap 2: Afronden',
                done: false
            }, ],
        };
        onAddTask(newTask);
        onClose();
    };

    return ( <
        div className = "fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 p-4" >
        <
        div className = "bg-slate-100 dark:bg-slate-900 rounded-2xl p-8 max-w-lg w-full transform transition-all" >
        <
        h2 className = "text-2xl font-bold mb-6 text-slate-800 dark:text-white" > Nieuwe Taak Toevoegen </h2> {
            step === 1 && ( <
                div >
                <
                p className = "mb-4 text-slate-600 dark:text-slate-300" > Hoe wil je je taak invoeren ? </p> <
                div className = "grid grid-cols-1 md:grid-cols-2 gap-4" >
                <
                button onClick = {
                    () => {
                        setInputType('spraak');
                        setStep(2);
                    }
                }
                className = "p-6 bg-white dark:bg-slate-800 rounded-xl text-center hover:bg-blue-50 dark:hover:bg-slate-700 transition-colors" >
                <
                Mic className = "mx-auto h-8 w-8 text-blue-500 mb-2" / >
                <
                span className = "font-semibold text-slate-700 dark:text-slate-200" > Spraakgestuurd </span> </button> <
                button onClick = {
                    () => {
                        setInputType('foto');
                        setStep(2);
                    }
                }
                className = "p-6 bg-white dark:bg-slate-800 rounded-xl text-center hover:bg-amber-50 dark:hover:bg-slate-700 transition-colors" >
                <
                Camera className = "mx-auto h-8 w-8 text-amber-500 mb-2" / >
                <
                span className = "font-semibold text-slate-700 dark:text-slate-200" > Foto van bord </span> </button> <
                button onClick = {
                    () => {
                        setInputType('visueel');
                        setStep(2);
                    }
                }
                className = "p-6 bg-white dark:bg-slate-800 rounded-xl text-center hover:bg-green-50 dark:hover:bg-slate-700 transition-colors" >
                <
                BookOpen className = "mx-auto h-8 w-8 text-green-500 mb-2" / >
                <
                span className = "font-semibold text-slate-700 dark:text-slate-200" > Visuele blokken </span> </button> <
                button onClick = {
                    () => {
                        setInputType('standaard');
                        setStep(2);
                    }
                }
                className = "p-6 bg-white dark:bg-slate-800 rounded-xl text-center hover:bg-rose-50 dark:hover:bg-slate-700 transition-colors" >
                <
                Plus className = "mx-auto h-8 w-8 text-rose-500 mb-2" / >
                <
                span className = "font-semibold text-slate-700 dark:text-slate-200" > Snel invoeren </span> </button> </div> </div>
            )
        } {
            step === 2 && ( <
                div >
                <
                button onClick = {
                    () => setStep(1)
                }
                className = "flex items-center text-sm text-blue-500 mb-4" >
                <
                ArrowLeft className = "h-4 w-4 mr-1" / > Terug </button> {
                    inputType === 'spraak' && < p className = "text-center p-4 bg-blue-50 dark:bg-slate-800 rounded-lg text-slate-600 dark:text-slate-300" > "Zeg bijvoorbeeld: 'Voeg wiskunde toe voor aanstaande vrijdag'." < br / > (Spraakherkenning is een demo) </p>} {
                        inputType === 'foto' && < p className = "text-center p-4 bg-amber-50 dark:bg-slate-800 rounded-lg text-slate-600 dark:text-slate-300" > Maak een foto van het schoolbord. < br / > (OCR-herkenning is een demo) </p>} <
                        div className = "space-y-4 mt-4" >
                        <
                        div >
                        <
                        label className = "block text-sm font-medium text-slate-600 dark:text-slate-300 mb-1" > Taakomschrijving </label> <
                        input type = "text"
                        value = {
                            taskTitle
                        }
                        onChange = {
                            (e) => setTaskTitle(e.target.value)
                        }
                        placeholder = "bv. Hoofdstuk 5 leren"
                        className = "w-full p-3 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition" /
                        >
                        </div> <
                        div >
                        <
                        label className = "block text-sm font-medium text-slate-600 dark:text-slate-300 mb-1" > Vak </label> <
                        select value = {
                            taskSubject
                        }
                        onChange = {
                            (e) => setTaskSubject(e.target.value)
                        }
                        className = "w-full p-3 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition" >
                        {
                            Object.keys(subjectColors).map(s => < option key = {
                                s
                            }
                            value = {
                                s
                            } > {
                                s
                            } </option>)} </select> </div> <
                            div >
                            <
                            label className = "block text-sm font-medium text-slate-600 dark:text-slate-300 mb-1" > Deadline </label> <
                            input type = "date"
                            value = {
                                taskDeadline
                            }
                            onChange = {
                                (e) => setTaskDeadline(e.target.value)
                            }
                            className = "w-full p-3 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition" /
                            >
                            </div> </div> </div>
                )
            } <
            div className = "flex justify-end gap-3 mt-8" >
            <
            button onClick = {
                onClose
            }
            className = "px-6 py-2 rounded-lg bg-gray-200 dark:bg-slate-700 text-slate-800 dark:text-slate-200 font-semibold hover:bg-gray-300 dark:hover:bg-slate-600 transition-colors" >
            Annuleren </button> {
                step === 2 && ( <
                    button onClick = {
                        handleAddTask
                    }
                    className = "px-6 py-2 rounded-lg bg-blue-500 text-white font-semibold hover:bg-blue-600 transition-colors" >
                    Taak Toevoegen </button>
                )
            } </div> </div> </div>
    );
};

// Component: Instellingen
const SettingsView = ({
    weekTempo,
    onUpdateTempo,
    darkMode,
    onToggleDarkMode
}) => {
    const days = ['maandag', 'dinsdag', 'woensdag', 'donderdag', 'vrijdag', 'zaterdag', 'zondag'];

    return ( <
        div className = "p-4 md:p-8" >
        <
        h2 className = "text-2xl md:text-3xl font-bold text-slate-800 dark:text-white mb-6 flex items-center" >
        <
        Settings className = "mr-3 text-slate-500" / > Instellingen </h2>

        <
        div className = "bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-lg mb-8" >
        <
        h3 className = "text-xl font-bold text-slate-800 dark:text-white mb-4" > Jouw Weektempo </h3> <
        p className = "text-slate-600 dark:text-slate-300 mb-4" > Hoeveel minuten wil je per dag aan school besteden ? </p> <
        div className = "space-y-4" > {
            days.map(day => ( <
                div key = {
                    day
                }
                className = "flex justify-between items-center" >
                <
                span className = "capitalize text-slate-700 dark:text-slate-200" > {
                    day
                } </span> <
                input type = "number"
                step = "5"
                min = "0"
                value = {
                    weekTempo[day.toLowerCase()]
                }
                onChange = {
                    (e) => onUpdateTempo(day.toLowerCase(), parseInt(e.target.value) || 0)
                }
                className = "w-24 p-2 text-center bg-slate-100 dark:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded-lg" /
                >
                </div>
            ))
        } </div> </div>

        <
        div className = "bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-lg mb-8" >
        <
        h3 className = "text-xl font-bold text-slate-800 dark:text-white mb-4" > Thema </h3> <
        div className = "flex items-center justify-between" >
        <
        span className = "text-slate-700 dark:text-slate-200" > Donkere Modus </span> <
        button onClick = {
            onToggleDarkMode
        }
        className = {
            `relative inline-flex items-center h-6 rounded-full w-11 transition-colors ${darkMode ? 'bg-blue-600' : 'bg-gray-200'}`
        } >
        <
        span className = {
            `inline-block w-4 h-4 transform bg-white rounded-full transition-transform ${darkMode ? 'translate-x-6' : 'translate-x-1'}`
        }
        /> </button> </div> </div>

        <
        div className = "bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-lg" >
        <
        h3 className = "text-xl font-bold text-slate-800 dark:text-white mb-4" > Koppelingen </h3> <
        p className = "text-slate-600 dark:text-slate-300 mb-4" > Verbind met Magister om je huiswerk automatisch te importeren. </p> <
        button className = "w-full bg-rose-500 text-white font-bold py-3 px-4 rounded-lg hover:bg-rose-600 transition-colors flex items-center justify-center" >
        <
        Share2 className = "mr-2" / > Koppel met Magister <
        /button> </div> </div>
    )
}

// Component: Focus Modus
const FocusView = ({
    onClose,
    task
}) => {
    const [
        time, setTime
    ] = useState(25 * 60); // 25 minuten
    const [
        isActive, setIsActive
    ] = useState(false);
    const [
        mode, setMode
    ] = useState('soft_start'); // 'soft_start' of 'clutch_mode'

    useEffect(() => {
        let interval = null;
        if (isActive && time > 0) {
            interval = setInterval(() => {
                setTime(t => t - 1);
            }, 1000);
        } else if (!isActive && time !== 0) {
            clearInterval(interval);
        } else if (time === 0) {
            clearInterval(interval);
            // Handle timer end
        }
        return () => clearInterval(interval);
    }, [isActive, time]);

    const formatTime = (seconds) => {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
    };

    const motivationalMessage = () => {
        if (mode === 'soft_start' && !isActive) return "Klaar om rustig te beginnen? Je hoeft alleen maar op start te drukken.";
        if (mode === 'clutch_mode' && !isActive) return "Tijd voor een snelle, intense focus-sprint!";
        if (isActive) return "Goed bezig! Je bent gefocust. Hou vol!";
        if (time === 0) return "Tijd is om! Fantastisch gewerkt. Neem even pauze.";
        return "";
    }

    return ( <
        div className = "fixed inset-0 bg-slate-100 dark:bg-slate-900 z-50 flex flex-col justify-between p-4 md:p-8" >
        <
        div >
        <
        button onClick = {
            onClose
        }
        className = "flex items-center text-sm text-blue-500 mb-8" >
        <
        ArrowLeft className = "h-4 w-4 mr-1" / > Terug naar overzicht </button> <
        div className = "text-center" >
        <
        div className = "inline-flex rounded-lg bg-white/50 dark:bg-slate-800/50 p-1 mb-6" >
        <
        button onClick = {
            () => setMode('soft_start')
        }
        className = {
            `px-4 py-2 rounded-md font-semibold transition-colors ${mode === 'soft_start' ? 'bg-white dark:bg-slate-700 text-blue-500' : 'text-slate-600 dark:text-slate-300'}`
        } >
        Soft Start </button> <
        button onClick = {
            () => setMode('clutch_mode')
        }
        className = {
            `px-4 py-2 rounded-md font-semibold transition-colors ${mode === 'clutch_mode' ? 'bg-white dark:bg-slate-700 text-green-500' : 'text-slate-600 dark:text-slate-300'}`
        } >
        Clutch Mode </button> </div> <
        h2 className = "text-2xl font-bold text-slate-800 dark:text-white" > Je focust nu op: </h2> <
        p className = "text-3xl md:text-5xl font-bold text-blue-500 mt-2" > {
            task ? task.title : "Een taak naar keuze"
        } </p> </div> </div>

        <
        div className = "text-center" >
        <
        div className = "text-7xl md:text-9xl font-bold text-slate-800 dark:text-white" > {
            formatTime(time)
        } </div> <
        p className = "text-slate-500 dark:text-slate-400 mt-4 h-12" > {
            motivationalMessage()
        } </p> </div>

        <
        div className = "text-center" >
        <
        button onClick = {
            () => setIsActive(!isActive)
        }
        className = {
            `w-36 h-36 rounded-full text-white text-2xl font-bold shadow-2xl transform hover:scale-105 transition-all ${isActive ? 'bg-red-500 hover:bg-red-600' : 'bg-green-500 hover:bg-green-600'}`
        } >
        {
            isActive ? 'Pauze' : 'Start'
        } </button> </div> </div>
    );
};

// Component: Profiel Weergave
const ProfileView = ({ tasks, onLogout }) => {
    const completedTasks = tasks.filter(t => t.status === 'done').length;

    return (
        <div className="p-4 md:p-8">
            <h2 className="text-2xl md:text-3xl font-bold text-slate-800 dark:text-white mb-6 flex items-center">
                <User className="mr-3 text-blue-500" />
                Jouw Profiel
            </h2>

            <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-lg mb-8 flex items-center space-x-6">
                <img 
                    src={`https://placehold.co/100x100/E2E8F0/475569?text=L`} 
                    alt="Profielfoto" 
                    className="w-24 h-24 rounded-full" 
                />
                <div>
                    <h3 className="text-2xl font-bold text-slate-800 dark:text-white">Lisa</h3>
                    <p className="text-slate-500 dark:text-slate-400">lisa.de.vries@example.com</p>
                </div>
            </div>

            <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-lg mb-8">
                <h3 className="text-xl font-bold text-slate-800 dark:text-white mb-4">Statistieken</h3>
                <div className="flex items-center space-x-4">
                    <Award className="h-8 w-8 text-amber-500" />
                    <div>
                        <p className="text-lg font-semibold text-slate-700 dark:text-slate-200">{completedTasks} taken voltooid</p>
                        <p className="text-slate-500 dark:text-slate-400">Goed bezig, ga zo door!</p>
                    </div>
                </div>
            </div>
            
            <button
                onClick={onLogout}
                className="w-full bg-red-500 text-white font-bold py-3 px-4 rounded-lg hover:bg-red-600 transition-colors flex items-center justify-center shadow-lg"
            >
                <LogOut className="mr-2" />
                Uitloggen
            </button>
        </div>
    );
};


// De kern applicatie
const MindMaprApp = ({ onLogout, darkMode, onToggleDarkMode }) => {
    const [
        tasks, setTasks
    ] = useState([]);
    const [
        view, setView
    ] = useState('dashboard'); // dashboard, settings, focus, profile
    const [
        isModalOpen, setIsModalOpen
    ] = useState(false);
    const [
        focusTask, setFocusTask
    ] = useState(null);
    const [
        notification, setNotification
    ] = useState(null);

    const [
        weekTempo, setWeekTempo
    ] = useState({
        maandag: 45,
        dinsdag: 0,
        woensdag: 60,
        donderdag: 30,
        vrijdag: 0,
        zaterdag: 20,
        zondag: 45,
    });

    const showNotification = (message, type = 'info') => {
        setNotification({
            message,
            type
        });
        setTimeout(() => setNotification(null), 4000);
    };

    const handleImportMagister = () => {
        setTasks(prev => [...prev, ...exampleTasks.filter(et => !prev.some(t => t.id === et.id))]);
        showNotification("Huiswerk uit Magister is geïmporteerd!", "success");
    };

    const handleToggleSubtask = (taskId, subtaskId) => {
        setTasks(tasks.map(task => {
            if (task.id === taskId) {
                const newSubtasks = task.subtasks.map(subtask => {
                    if (subtask.id === subtaskId) {
                        return { ...subtask,
                            done: !subtask.done
                        };
                    }
                    return subtask;
                });
                const allDone = newSubtasks.every(st => st.done);
                if (allDone && task.status !== 'done') {
                    showNotification(`Goed gedaan! '${task.title}' is afgerond.`, "success");
                }
                return { ...task,
                    subtasks: newSubtasks,
                    status: allDone ? 'done' : 'in-progress'
                };
            }
            return task;
        }));
    };

    const handleAddTask = (newTask) => {
        setTasks([...tasks, newTask]);
        showNotification(`Taak '${newTask.title}' is toegevoegd.`, "success");
    };

    const handleUpdateTempo = (day, value) => {
        setWeekTempo({ ...weekTempo,
            [day]: value
        });
    };

    const renderView = () => {
        switch (view) {
            case 'settings':
                return < SettingsView weekTempo = {
                    weekTempo
                }
                onUpdateTempo = {
                    handleUpdateTempo
                }
                darkMode = {
                    darkMode
                }
                onToggleDarkMode = {
                    onToggleDarkMode
                }
                />;
            case 'focus':
                return < FocusView onClose = {
                    () => setView('dashboard')
                }
                task = {
                    focusTask
                }
                />;
            case 'profile':
                 return <ProfileView tasks={tasks} onLogout={onLogout} />;
            default:
                return ( <
                    div >
                    <
                    MindmapView tasks = {
                        tasks.filter(t => t.status !== 'done')
                    }
                    onToggleSubtask = {
                        handleToggleSubtask
                    }
                    /> <
                    PlanningTimeline tasks = {
                        tasks
                    }
                    weekTempo = {
                        weekTempo
                    }
                    /> {
                        tasks.filter(t => t.status === 'done').length > 0 && ( <
                            div className = "p-4 md:p-8 mt-8" >
                            <
                            h2 className = "text-2xl font-bold text-slate-800 dark:text-white mb-4 flex items-center" >
                            <
                            CheckCircle className = "mr-3 text-green-500" / > Afgeronde Taken </h2> <
                            div className = "bg-white dark:bg-slate-800 p-4 rounded-2xl space-y-2 shadow" > {
                                tasks.filter(t => t.status === 'done').map(t => ( <
                                    p key = {
                                        t.id
                                    }
                                    className = "text-slate-500 dark:text-slate-400 line-through" > {
                                        t.title
                                    } </p>
                                ))
                            } </div> </div>
                        )
                    } </div>
                );
        }
    };


    return ( <
        div className = "min-h-screen bg-slate-100 dark:bg-slate-900 font-sans transition-colors" > {
            notification && ( <
                div className = {
                    `fixed top-5 right-5 z-50 p-4 rounded-lg shadow-lg text-white ${notification.type === 'success' ? 'bg-green-500' : 'bg-blue-500'}`
                } > {
                    notification.message
                } </div>
            )
        }

        <
        header className = "bg-white/70 dark:bg-slate-800/70 backdrop-blur-lg sticky top-0 z-40" >
        <
        div className = "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" >
        <
        div className = "flex justify-between items-center py-4" >
        <
        div className = "flex items-center" >
        <
        Brain className = "h-8 w-8 text-blue-500" / >
        <
        h1 className = "text-2xl font-bold ml-2 text-slate-800 dark:text-white" > MindMapr </h1> </div> <
        nav className = "flex items-center space-x-1 md:space-x-2" >
        <
        button onClick = {
            () => setView('dashboard')
        }
        className = {
            `p-2 rounded-full ${view === 'dashboard' ? 'bg-blue-100 dark:bg-blue-900' : ''} hover:bg-blue-100 dark:hover:bg-blue-800 transition-colors`
        } >
        <
        BookOpen className = {
            `h-6 w-6 ${view === 'dashboard' ? 'text-blue-500' : 'text-slate-600 dark:text-slate-300'}`
        }
        /> </button> <
        button onClick = {
            () => setView('profile')
        }
        className = {
            `p-2 rounded-full ${view === 'profile' ? 'bg-blue-100 dark:bg-blue-900' : ''} hover:bg-blue-100 dark:hover:bg-blue-800 transition-colors`
        } >
        <
        User className = {
            `h-6 w-6 ${view === 'profile' ? 'text-blue-500' : 'text-slate-600 dark:text-slate-300'}`
        }
        /> </button> <
        button onClick = {
            () => setView('settings')
        }
        className = {
            `p-2 rounded-full ${view === 'settings' ? 'bg-blue-100 dark:bg-blue-900' : ''} hover:bg-blue-100 dark:hover:bg-blue-800 transition-colors`
        } >
        <
        Settings className = {
            `h-6 w-6 ${view === 'settings' ? 'text-blue-500' : 'text-slate-600 dark:text-slate-300'}`
        }
        /> </button> <
        button onClick = {
            onToggleDarkMode
        }
        className = "p-2 rounded-full hover:bg-blue-100 dark:hover:bg-blue-800 transition-colors" > {
            darkMode ? < Sun className = "h-6 w-6 text-slate-300" / > : < Moon className = "h-6 w-6 text-slate-600" / >
        } </button>  
        </nav>  
        </div>  
        </div>  
        </header>

        <
        main className = "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8" > {
            tasks.length === 0 ? ( <
                div className = "text-center py-20" >
                <
                h2 className = "text-3xl font-bold text-slate-700 dark:text-slate-200" > Welkom bij MindMapr! </h2> <
                p className = "mt-4 text-slate-500 dark:text-slate-400" > Laten we je schoolwerk overzichtelijk maken.Begin door je taken te importeren. </p> <
                div className = "mt-8 flex justify-center gap-4" >
                <
                button onClick = {
                    handleImportMagister
                }
                className = "bg-rose-500 text-white font-bold py-3 px-6 rounded-lg hover:bg-rose-600 transition-colors flex items-center shadow-lg" >
                <
                Share2 className = "mr-2" / > Importeer uit Magister </button> <
                button onClick = {
                    () => setIsModalOpen(true)
                }
                className = "bg-blue-500 text-white font-bold py-3 px-6 rounded-lg hover:bg-blue-600 transition-colors flex items-center shadow-lg" >
                <
                Plus className = "mr-2" / > Voeg handmatig toe </button> </div> </div>
            ) : (
                renderView()
            )
        } </main>

        {
            tasks.length > 0 && view === 'dashboard' && ( <
                div className = "fixed bottom-8 right-8 z-40 flex flex-col gap-4" >
                <
                button onClick = {
                    () => {
                        setFocusTask(tasks.find(t => t.status !== 'done') || null);
                        setView('focus');
                    }
                }
                className = "bg-green-500 text-white rounded-full p-4 shadow-lg hover:bg-green-600 transform hover:scale-110 transition-all"
                title = "Start Focus Modus" >
                <
                Brain className = "h-8 w-8" / >
                </button> <
                button onClick = {
                    () => setIsModalOpen(true)
                }
                className = "bg-blue-500 text-white rounded-full p-4 shadow-lg hover:bg-blue-600 transform hover:scale-110 transition-all"
                title = "Nieuwe Taak Toevoegen" >
                <
                Plus className = "h-8 w-8" / >
                </button> </div>
            )
        }

        {
            isModalOpen && < AddTaskModal onClose = {
                () => setIsModalOpen(false)
            }
            onAddTask = {
                handleAddTask
            }
            />} </div>
    );
}

// Hoofd App Component die authenticatie beheert
export default function App() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [darkMode, setDarkMode] = useState(false);

    useEffect(() => {
        if (darkMode) {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
        // Add font link to head
        const link = document.createElement('link');
        link.href = "https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap";
        link.rel = 'stylesheet';
        document.head.appendChild(link);
        // Apply font to body
        document.body.style.fontFamily = "'Inter', sans-serif";
    }, [darkMode]);

    if (!isLoggedIn) {
        return <LoginScreen onLogin={() => setIsLoggedIn(true)} />;
    }

    return <MindMaprApp 
                onLogout={() => setIsLoggedIn(false)} 
                darkMode={darkMode} 
                onToggleDarkMode={() => setDarkMode(!darkMode)} 
            />;
}
