export const coursesData = [
  // Semester 1
  {
    id: "cse101",
    code: "CSE101",
    name: "Introduction to Computer Programming",
    semester: 1,
    credits: 4,
    syllabus: "Basics of computer programming, algorithms, flowcharting, control structures, loops, functions, lists, tuples, dictionaries, and file handling in Python.",
    notes: [
      {
        unit: 1,
        title: "Unit 1: Introduction & Flowcharts",
        description: "Problem-solving techniques, writing algorithms, understanding pseudocode, designing flowcharts, and basic variables/types in Python.",
        content: [
          "Algorithm: Step-by-step procedure to solve a problem. It must be finite, clear, and effective.",
          "Flowchart Symbols: Oval (Start/End), Parallelogram (Input/Output), Rectangle (Process), Diamond (Decision), Arrows (Flow line).",
          "Python Basics: Dynamic typing, indentations, print() and input() functions.",
          "Variables: Naming rules - must start with a letter or underscore, case-sensitive."
        ]
      },
      {
        unit: 2,
        title: "Unit 2: Decision Making & Control Structures",
        description: "Conditional logic, if-else structures, nested conditions, logical operators (and, or, not), and comparisons.",
        content: [
          "If Statement: Executes a block of code if the condition is True.",
          "If-Elif-Else Ladder: Used to test multiple conditions sequentially.",
          "Logical Operators: 'and' returns True if both are true; 'or' returns True if at least one is true; 'not' reverses the boolean value.",
          "Precedence of Operators: Arithmetic operators (*, /, +, -) > Comparison operators (==, !=, <) > Logical operators (not, and, or)."
        ]
      },
      {
        unit: 3,
        title: "Unit 3: Loops & Iterations",
        description: "Repetitive execution, while loops, for loops, range() function, break, continue, and pass statements.",
        content: [
          "While Loop: Keeps executing as long as a test condition remains True.",
          "For Loop: Iterates over a sequence (list, tuple, string, range).",
          "range(start, stop, step): Generates numbers from start to stop-1 by step.",
          "Break: Immediately terminates the loop.",
          "Continue: Skips the current iteration and goes to the next check."
        ]
      },
      {
        unit: 4,
        title: "Unit 4: Functions & Modules",
        description: "Code modularity, def keyword, parameters, return values, scope of variables, global keyword, and standard library modules.",
        content: [
          "Defining Functions: Use 'def function_name(parameters):' followed by an indented block.",
          "Arguments: Positional arguments, keyword arguments, default arguments, and variable-length arguments (*args, **kwargs).",
          "Scope: Local variables exist only inside the function. Global variables are accessible everywhere.",
          "Importing Modules: 'import math' or 'from math import sqrt'."
        ]
      },
      {
        unit: 5,
        title: "Unit 5: Data Structures (Lists, Tuples)",
        description: "Creating, indexing, slicing, and manipulating ordered collections in Python. Differences between mutable and immutable types.",
        content: [
          "Lists: Mutable, ordered sequence of elements, defined with square brackets []. Support methods like append(), insert(), remove(), pop().",
          "Tuples: Immutable, ordered sequence of elements, defined with parentheses (). Cannot be changed after creation. Faster than lists.",
          "Slicing syntax: list[start:stop:step] allows fetching sub-parts of a sequence.",
          "List Comprehension: Compact way of generating lists: [x**2 for x in range(5)]."
        ]
      },
      {
        unit: 6,
        title: "Unit 6: Dictionaries & File Handling",
        description: "Key-value pair mappings, lookups, reading and writing files using open() and the with statement context manager.",
        content: [
          "Dictionaries: Unordered, mutable key-value mappings, defined with curly braces {key: value}.",
          "File Open Modes: 'r' (read), 'w' (write, overwrites), 'a' (append), 'r+' (read & write).",
          "Context Manager: 'with open(filename, mode) as f:' automatically closes the file.",
          "File Methods: read(), readline(), readlines(), write(), writelines()."
        ]
      }
    ],
    pyqs: [
      { year: "2024", type: "End-Term", filename: "CSE101_Endterm_2024.pdf" },
      { year: "2023", type: "Mid-Term", filename: "CSE101_Midterm_2023.pdf" },
      { year: "2023", type: "End-Term", filename: "CSE101_Endterm_2023.pdf" }
    ],
    mcqs: [
      {
        id: "cse101_q1",
        question: "Which of the following is an invalid variable name in Python?",
        options: ["_my_var", "var_3", "3rd_var", "varThree"],
        answer: 2,
        explanation: "Python variables cannot start with a number. They must start with a letter or an underscore."
      },
      {
        id: "cse101_q2",
        question: "What is the output of print(2 ** 3 ** 2) in Python?",
        options: ["64", "512", "12", "32"],
        answer: 1,
        explanation: "The exponentiation operator (**) is evaluated from right to left (right-associative). So 3 ** 2 is evaluated first to 9, then 2 ** 9 is evaluated to 512."
      },
      {
        id: "cse101_q3",
        question: "Which data type in Python is immutable?",
        options: ["List", "Dictionary", "Set", "Tuple"],
        answer: 3,
        explanation: "Tuples are immutable sequences, meaning their contents cannot be changed or updated in place after creation."
      }
    ],
    videos: [
      { title: "Python Programming Introduction", duration: "18:25", youtubeId: "rfscVS0vtbw", views: "1.2M views" },
      { title: "Python Loops and Control Structures", duration: "25:40", youtubeId: "6iF8Xb7Z3Q0", views: "850K views" },
      { title: "Lists, Tuples & Dictionaries Explained", duration: "32:15", youtubeId: "daefaLgNfn0", views: "620K views" }
    ]
  },
  {
    id: "mth101",
    code: "MTH101",
    name: "Calculus & Analytical Geometry",
    semester: 1,
    credits: 4,
    syllabus: "Differential calculus, limit, continuity, Mean Value Theorems, partial differentiation, integral calculus, double/triple integrals, and infinite series tests.",
    notes: [
      { unit: 1, title: "Unit 1: Limits & Continuity", description: "L'Hopital's Rule, epsilon-delta definition, continuity at a point, and types of discontinuities." },
      { unit: 2, title: "Unit 2: Mean Value Theorems", description: "Rolle's Theorem, Lagrange's and Cauchy's Mean Value Theorems, and Taylor's/Maclaurin's series." },
      { unit: 3, title: "Unit 3: Partial Differentiation", description: "Functions of several variables, Euler's theorem on homogeneous functions, Jacobians, and extrema." }
    ],
    pyqs: [
      { year: "2024", type: "Mid-Term", filename: "MTH101_Midterm_2024.pdf" },
      { year: "2023", type: "End-Term", filename: "MTH101_Endterm_2023.pdf" }
    ],
    mcqs: [
      {
        id: "mth101_q1",
        question: "If f(x) = x * sin(1/x) for x != 0 and f(0) = 0, is f(x) continuous at x = 0?",
        options: ["Yes, continuous", "No, discontinuous", "Cannot be determined", "Divergent"],
        answer: 0,
        explanation: "By squeeze theorem, as x approaches 0, |x * sin(1/x)| <= |x|, which goes to 0. Thus the limit is equal to f(0), so it is continuous."
      }
    ],
    videos: [
      { title: "Essence of Calculus - Chapter 1", duration: "17:05", youtubeId: "WUvTyaaNkzM", views: "3.4M views" },
      { title: "Taylor Series & Maclaurin Series", duration: "22:18", youtubeId: "3d6DsjIBzJ4", views: "1.1M views" }
    ]
  },

  // Semester 2
  {
    id: "cse202",
    code: "CSE202",
    name: "Object-Oriented Programming (C++)",
    semester: 2,
    credits: 4,
    syllabus: "Procedural vs Object-Oriented paradigm, Classes, Objects, Constructors, Encapsulation, Inheritance, Polymorphism (Overloading, Overriding), Virtual Functions, Templates, and File I/O.",
    notes: [
      {
        unit: 1,
        title: "Unit 1: Classes & Encapsulation",
        description: "Defining classes, visibility modifiers (public, private, protected), setter/getter methods, this pointer, and static data members.",
        content: [
          "Class: User-defined blueprint/template containing attributes (variables) and methods (functions).",
          "Object: Instance of a class that allocates physical memory.",
          "Access Specifiers: private (inside class only), public (accessible everywhere), protected (inside class and derived classes).",
          "Encapsulation: Bundling data and functions together while hiding internal details."
        ]
      },
      {
        unit: 2,
        title: "Unit 2: Constructors & Destructors",
        description: "Default, parameterized, and copy constructors, constructor overloading, destructor invocation, and dynamic memory allocations with new/delete.",
        content: [
          "Constructor: Member function called automatically when an object is instantiated. Same name as class, no return type.",
          "Copy Constructor: Initializes an object using another object of the same class (syntax: ClassName(const ClassName &obj)).",
          "Shallow Copy vs Deep Copy: Shallow copies pointer addresses; Deep copies the actual data dynamically allocated.",
          "Destructor: Deallocates memory. Preceded by tilde (~), cannot be overloaded, takes no arguments."
        ]
      },
      {
        unit: 3,
        title: "Unit 3: Inheritance & Polymorphism",
        description: "Single, multiple, multilevel, hierarchical, and hybrid inheritance. Method overloading, operator overloading, and friend functions.",
        content: [
          "Inheritance: Process where one class acquires the properties of another. Syntax: class Derived : access_mode Base.",
          "Diamond Problem: In multiple inheritance, base class duplicate copies occur. Resolved using virtual base classes.",
          "Compile-Time Polymorphism: Function overloading and Operator overloading.",
          "Friend Function: Non-member function allowed to access private/protected elements of a class."
        ]
      },
      {
        unit: 4,
        title: "Unit 4: Virtual Functions & Abstraction",
        description: "Late binding, virtual table (V-Table), pure virtual functions, and abstract base classes.",
        content: [
          "Virtual Function: Member function declared 'virtual' in base class, overridden in derived class to achieve runtime polymorphism.",
          "Pure Virtual Function: Virtual function with no implementation (syntax: virtual void draw() = 0;).",
          "Abstract Class: A class containing at least one pure virtual function. Cannot be instantiated.",
          "Late Binding: Function call resolved at runtime based on the actual object pointed to, rather than pointer type."
        ]
      }
    ],
    pyqs: [
      { year: "2024", type: "End-Term", filename: "CSE202_Endterm_2024.pdf" },
      { year: "2023", type: "Mid-Term", filename: "CSE202_Midterm_2023.pdf" }
    ],
    mcqs: [
      {
        id: "cse202_q1",
        question: "Which of the following constructor types is used to initialize an object with another existing object?",
        options: ["Default Constructor", "Parameterized Constructor", "Copy Constructor", "Virtual Constructor"],
        answer: 2,
        explanation: "A Copy Constructor is a member function that initializes an object using another object of the same class."
      },
      {
        id: "cse202_q2",
        question: "What makes a C++ class an Abstract Class?",
        options: ["Declaring a constructor as private", "Declaring at least one pure virtual function", "Inheriting from multiple classes", "Using the virtual keyword before class name"],
        answer: 1,
        explanation: "A class containing at least one pure virtual function (e.g. virtual void func() = 0;) is an abstract class and cannot be instantiated."
      }
    ],
    videos: [
      { title: "Object Oriented Programming in C++", duration: "44:12", youtubeId: "wN0x9eZLix4", views: "1.8M views" },
      { title: "Virtual Functions & Runtime Polymorphism", duration: "19:05", youtubeId: "fZJuV7bJ2s0", views: "450K views" }
    ]
  },
  {
    id: "ece213",
    code: "ECE213",
    name: "Digital Electronics",
    semester: 2,
    credits: 3,
    syllabus: "Number systems, Boolean algebra, logic gates, K-maps minimization, Adders, Subtractors, Multiplexers, Decoders, Flip-Flops (SR, JK, D, T), Counters, and Registers.",
    notes: [
      { unit: 1, title: "Unit 1: Number Systems & Logic Gates", description: "Binary, octal, hexadecimal conversion, 2's complement arithmetic, AND/OR/NOT/XOR gates, and universal gates NAND/NOR." }
    ],
    pyqs: [
      { year: "2023", type: "End-Term", filename: "ECE213_Endterm_2023.pdf" }
    ],
    mcqs: [
      {
        id: "ece213_q1",
        question: "Which gate is known as the Universal Gate?",
        options: ["AND Gate", "OR Gate", "NAND Gate", "XOR Gate"],
        answer: 2,
        explanation: "NAND and NOR gates are universal gates because any boolean expression can be realized using only NAND or only NOR gates."
      }
    ],
    videos: [
      { title: "Logic Gates & Boolean Algebra", duration: "20:55", youtubeId: "g4Ufh0RzYqM", views: "920K views" }
    ]
  },

  // Semester 3
  {
    id: "cse205",
    code: "CSE205",
    name: "Data Structures and Algorithms",
    semester: 3,
    credits: 4,
    syllabus: "Time & space complexity, Arrays, Linked Lists (Singly, Doubly, Circular), Stacks, Queues, Binary Trees, Binary Search Trees (BST), AVL Trees, Graphs, Sorting (Bubble, Insertion, Quick, Merge, Heap), and Searching.",
    notes: [
      {
        unit: 1,
        title: "Unit 1: Complexity Analysis & Arrays",
        description: "Asymptotic notations (Big O, Omega, Theta), 1D/2D arrays, address calculation, memory representations, operations (insertion, deletion, traversal).",
        content: [
          "Big O Notation (O): Represents the upper bound (worst-case time complexity).",
          "Omega Notation (Ω): Represents the lower bound (best-case time complexity).",
          "Theta Notation (Θ): Represents the tight bound (average-case complexity).",
          "1D Array Address: Address of A[i] = BaseAddress + i * SizeOfElement.",
          "2D Array Row-Major: Address of A[i][j] = BaseAddress + [i * NumOfColumns + j] * SizeOfElement."
        ]
      },
      {
        unit: 2,
        title: "Unit 2: Linked Lists",
        description: "Singly Linked List, Doubly Linked List, Circular Linked List, pointers, nodes, insertion, deletion at front/middle/end, and reversing lists.",
        content: [
          "Singly Linked List: Nodes contain data and a single pointer ('next') to the next node.",
          "Doubly Linked List: Nodes contain data, 'prev' pointer, and 'next' pointer. Allows bidirectional traversal.",
          "Circular Linked List: The 'next' pointer of the last node points back to the first node.",
          "Linked List vs Array: Linked lists have dynamic sizing and O(1) insertions/deletions (given node pointer), but require extra memory for pointers and have O(n) access time."
        ]
      },
      {
        unit: 3,
        title: "Unit 3: Stacks & Queues",
        description: "LIFO/FIFO paradigms, push/pop/peek operations, arrays/linked list implementations, infix-to-postfix conversions, evaluation of postfix expressions, Circular Queues, Deques, and Priority Queues.",
        content: [
          "Stack: Last In First Out (LIFO) data structure. Main operations: Push (insert), Pop (remove), Peek (top item).",
          "Queue: First In First Out (FIFO) data structure. Main operations: Enqueue (insert at rear), Dequeue (remove from front).",
          "Circular Queue: Overcomes memory wastage in simple array queues by wrapping index pointers: rear = (rear + 1) % size.",
          "Deque (Double Ended Queue): Supports insertion/deletion at both ends."
        ]
      },
      {
        unit: 4,
        title: "Unit 4: Trees & Binary Search Trees",
        description: "Hierarchical structures, tree terminology, binary tree traversals (Inorder, Preorder, Postorder), binary search tree (BST) insertion, search, deletion, and height-balancing (AVL tree basics).",
        content: [
          "Binary Tree: A tree where every node has at most 2 children.",
          "Traversals: Inorder (Left-Root-Right), Preorder (Root-Left-Right), Postorder (Left-Right-Root).",
          "Binary Search Tree (BST): A binary tree where the left subtree contains values smaller than the root, and the right subtree contains values larger.",
          "Inorder traversal of a BST always yields sorted keys.",
          "AVL Tree: Self-balancing BST where the difference of heights of left and right subtrees (Balance Factor) of any node is at most 1 (-1, 0, or +1)."
        ]
      }
    ],
    pyqs: [
      { year: "2024", type: "End-Term", filename: "CSE205_Endterm_2024.pdf" },
      { year: "2023", type: "Mid-Term", filename: "CSE205_Midterm_2023.pdf" },
      { year: "2022", type: "End-Term", filename: "CSE205_Endterm_2022.pdf" }
    ],
    mcqs: [
      {
        id: "cse205_q1",
        question: "What is the worst-case time complexity of searching in a standard Binary Search Tree (BST)?",
        options: ["O(log N)", "O(N)", "O(N log N)", "O(1)"],
        answer: 1,
        explanation: "In a skewed BST (where elements are inserted in sorted order), the tree degenerates into a linked list, making search time complexity O(N)."
      },
      {
        id: "cse205_q2",
        question: "Which data structure is utilized in Depth First Search (DFS) of a graph?",
        options: ["Queue", "Stack", "Heap", "Hash Table"],
        answer: 1,
        explanation: "DFS uses a Stack (call stack or explicit stack) to keep track of visited nodes, while BFS (Breadth First Search) utilizes a Queue."
      },
      {
        id: "cse205_q3",
        question: "Which of the following sorting algorithms is stable and has a guaranteed worst-case time complexity of O(N log N)?",
        options: ["Quick Sort", "Merge Sort", "Bubble Sort", "Heap Sort"],
        answer: 1,
        explanation: "Merge Sort is a stable sorting algorithm and always runs in O(N log N) time in best, worst, and average cases."
      }
    ],
    videos: [
      { title: "Introduction to Data Structures & Algorithms", duration: "25:40", youtubeId: "8hly31yOjEs", views: "2.4M views" },
      { title: "Binary Trees & BST Traversals", duration: "35:10", youtubeId: "yO03R4f85eI", views: "1.1M views" },
      { title: "Merge Sort & Quick Sort Animations", duration: "19:50", youtubeId: "8a6k_G2g98s", views: "870K views" }
    ]
  },
  {
    id: "int219",
    code: "INT219",
    name: "Front-end Web Development",
    semester: 3,
    credits: 3,
    syllabus: "HTML5 semantic elements, CSS3 styling, Flexbox, CSS Grid, Media Queries, Responsive Design, JavaScript ES6 features, DOM Manipulation, Fetch API, and Intro to React.",
    notes: [
      { unit: 1, title: "Unit 1: HTML5 & Semantic Elements", description: "DocType, structural tags (header, section, article, footer, aside), forms, and inputs." },
      { unit: 2, title: "Unit 2: CSS3 Grid & Flexbox", description: "Responsive layouts, flex-direction, align-items, justify-content, grid-template-columns, and media queries." }
    ],
    pyqs: [
      { year: "2024", type: "End-Term", filename: "INT219_Endterm_2024.pdf" }
    ],
    mcqs: [
      {
        id: "int219_q1",
        question: "Which of the following is correct to declare a CSS flex container?",
        options: ["display: block;", "display: flexbox;", "display: flex;", "display: inline-grid;"],
        answer: 2,
        explanation: "The command 'display: flex;' defines the element as a flex container and makes its children flex items."
      }
    ],
    videos: [
      { title: "Web Development Course for Beginners", duration: "50:12", youtubeId: "zjs26090N80", views: "5.5M views" }
    ]
  },

  // Semester 4
  {
    id: "cse306",
    code: "CSE306",
    name: "Operating Systems",
    semester: 4,
    credits: 4,
    syllabus: "Process management, threads, CPU Scheduling algorithms, synchronization (Semaphores, Mutex), Deadlock handling, Memory management (Paging, Segmentation, Virtual Memory, Page replacement), and Disk scheduling.",
    notes: [
      {
        unit: 1,
        title: "Unit 1: Intro & Process Management",
        description: "Operating system operations, process control block (PCB), states of process, scheduler queues, and context switching.",
        content: [
          "Operating System: Program acting as intermediary between user and hardware.",
          "Process: Program in execution. States: New, Ready, Running, Waiting, Terminated.",
          "PCB (Process Control Block): Data structure storing process info (PID, program counter, register values, memory limits).",
          "Context Switch: Saving state of CPU for old process and loading state of new process."
        ]
      },
      {
        unit: 2,
        title: "Unit 2: CPU Scheduling",
        description: "Preemptive and non-preemptive scheduling. First-Come-First-Serve (FCFS), Shortest-Job-First (SJF), Round Robin (RR), and Priority Scheduling.",
        content: [
          "FCFS: Non-preemptive, suffers from Convoy Effect (short processes waiting for long ones).",
          "SJF: Gives minimum average waiting time. Can be preemptive (Shortest Remaining Time First).",
          "Round Robin: Preemptive, uses a 'Time Quantum'. Excellent for time-sharing.",
          "Waiting Time: WT = Turnaround Time - Burst Time. Turnaround Time = Completion Time - Arrival Time."
        ]
      }
    ],
    pyqs: [
      { year: "2023", type: "End-Term", filename: "CSE306_Endterm_2023.pdf" }
    ],
    mcqs: [
      {
        id: "cse306_q1",
        question: "Which scheduling algorithm is optimal and produces the minimum average waiting time?",
        options: ["Round Robin", "First-Come-First-Serve", "Shortest Job First (SJF)", "Priority Scheduling"],
        answer: 2,
        explanation: "Shortest Job First (SJF) scheduling is provably optimal because it schedules the shortest process first, resulting in the lowest average waiting time."
      }
    ],
    videos: [
      { title: "Operating Systems Course Overview", duration: "22:15", youtubeId: "vBURTt97EkA", views: "1.4M views" }
    ]
  },
  {
    id: "cse310",
    code: "CSE310",
    name: "Database Management Systems",
    semester: 4,
    credits: 4,
    syllabus: "Database architecture, ER-Diagrams, Relational model, SQL queries, Normalization (1NF, 2NF, 3NF, BCNF), Transaction properties (ACID), Concurrency Control, and recovery.",
    notes: [
      { unit: 1, title: "Unit 1: ER Diagrams & Relational Model", description: "Entity types, relationships, weak entities, key constraints, and schema designs." }
    ],
    pyqs: [
      { year: "2024", type: "Mid-Term", filename: "CSE310_Midterm_2024.pdf" }
    ],
    mcqs: [
      {
        id: "cse310_q1",
        question: "Which normal form requires that partial dependency should not exist?",
        options: ["1NF", "2NF", "3NF", "BCNF"],
        answer: 1,
        explanation: "A table is in Second Normal Form (2NF) if it is in 1NF and no non-prime attribute is partially dependent on any candidate key."
      }
    ],
    videos: [
      { title: "SQL Tutorial for Beginners", duration: "38:40", youtubeId: "HXV3zeQKqGY", views: "4.1M views" }
    ]
  },

  // Semester 5
  {
    id: "cse325",
    code: "CSE325",
    name: "Computer Networks",
    semester: 5,
    credits: 4,
    syllabus: "OSI and TCP/IP Reference models, Physical layer coding, Data Link framing, Error detection/correction, MAC protocols, Routing algorithms, Congestion control, TCP/UDP protocols, and Application layer (DNS, HTTP, SMTP).",
    notes: [
      { unit: 1, title: "Unit 1: Network Layers & Topologies", description: "OSI Model vs TCP/IP Model, Hubs, Switches, Routers, and Bus/Star/Mesh topologies." }
    ],
    pyqs: [
      { year: "2023", type: "End-Term", filename: "CSE325_Endterm_2023.pdf" }
    ],
    mcqs: [
      {
        id: "cse325_q1",
        question: "Which layer of the OSI model is responsible for routing packets across networks?",
        options: ["Data Link Layer", "Transport Layer", "Network Layer", "Session Layer"],
        answer: 2,
        explanation: "The Network Layer handles packet routing, logical addressing (IP addresses), and routing protocols."
      }
    ],
    videos: [
      { title: "Computer Networking Full Course", duration: "48:10", youtubeId: "IPvYjXCsTg8", views: "2.8M views" }
    ]
  },
  {
    id: "int306",
    code: "INT306",
    name: "Back-end Web Development",
    semester: 5,
    credits: 4,
    syllabus: "NodeJS runtime, event loop, Express routing, middleware, RESTful API design, database integration (MongoDB/Mongoose), session management, JWT auth, and deployment.",
    notes: [
      { unit: 1, title: "Unit 1: NodeJS Architecture", description: "V8 engine, Single-threaded event loop, asynchronous non-blocking I/O operations, and npm packages." }
    ],
    pyqs: [
      { year: "2024", type: "End-Term", filename: "INT306_Endterm_2024.pdf" }
    ],
    mcqs: [
      {
        id: "int306_q1",
        question: "What is the name of Node.js package manager?",
        options: ["npm", "yarn", "pip", "composer"],
        answer: 0,
        explanation: "npm (Node Package Manager) is the default package manager for Node.js."
      }
    ],
    videos: [
      { title: "NodeJS & Express Tutorial", duration: "40:50", youtubeId: "Oe421EPjeBE", views: "1.9M views" }
    ]
  },

  // Semester 6
  {
    id: "cse316",
    code: "CSE316",
    name: "Computer Organization and Architecture",
    semester: 6,
    credits: 3,
    syllabus: "Register transfer language, bus design, arithmetic microoperations, CPU design, instruction cycle, addressing modes, pipeline execution, cache memory, and virtual memory mapping.",
    notes: [
      { unit: 1, title: "Unit 1: Register Transfer & CPU", description: "Buses, Memory Transfer, ALU operations, and design of accumulation registers." }
    ],
    pyqs: [
      { year: "2024", type: "Mid-Term", filename: "CSE316_Midterm_2024.pdf" }
    ],
    mcqs: [
      {
        id: "cse316_q1",
        question: "Which cache mapping technique allows any memory block to be loaded into any cache line?",
        options: ["Direct Mapping", "Fully Associative Mapping", "Set Associative Mapping", "Random Mapping"],
        answer: 1,
        explanation: "In fully associative mapping, any block from main memory can go into any line of the cache, giving flexibility but requiring complex hardware search."
      }
    ],
    videos: [
      { title: "Computer Architecture Tutorials", duration: "28:15", youtubeId: "4TzMyXyEsbQ", views: "650K views" }
    ]
  },
  {
    id: "cse408",
    code: "CSE408",
    name: "Software Engineering",
    semester: 6,
    credits: 3,
    syllabus: "SDLC models (Waterfall, Spiral, Agile), requirement analysis, SRS documents, software design metrics, Cohesion and Coupling, testing strategies (Black-box, White-box), and maintenance models.",
    notes: [
      { unit: 1, title: "Unit 1: SDLC Process Models", description: "Incremental, Spiral, Evolutionary, and Agile frameworks including Scrum." }
    ],
    pyqs: [
      { year: "2023", type: "End-Term", filename: "CSE408_Endterm_2023.pdf" }
    ],
    mcqs: [
      {
        id: "cse408_q1",
        question: "What type of coupling is preferred for good software design?",
        options: ["High Coupling", "Low Coupling", "Content Coupling", "Control Coupling"],
        answer: 1,
        explanation: "Software modules should exhibit high cohesion (closely related features within) and low coupling (low dependency between different modules)."
      }
    ],
    videos: [
      { title: "Software Engineering Principles", duration: "25:30", youtubeId: "sB2iAUPVsf4", views: "820K views" }
    ]
  },

  // Semester 7
  {
    id: "cse422",
    code: "CSE422",
    name: "Cryptography & Network Security",
    semester: 7,
    credits: 3,
    syllabus: "Symmetric key cryptography (DES, AES), Public key cryptography (RSA, Diffie-Hellman), Hash functions (SHA), Digital signatures, Firewalls, and IP Security.",
    notes: [
      { unit: 1, title: "Unit 1: Basic Encryption", description: "Substitution ciphers, transposition ciphers, and cryptanalysis models." }
    ],
    pyqs: [
      { year: "2024", type: "Mid-Term", filename: "CSE422_Midterm_2024.pdf" }
    ],
    mcqs: [
      {
        id: "cse422_q1",
        question: "Which cryptographic algorithm is based on the difficulty of factoring large composite prime numbers?",
        options: ["AES", "DES", "RSA", "Diffie-Hellman"],
        answer: 2,
        explanation: "RSA is an asymmetric cipher whose security relies on the practical difficulty of factoring the product of two large prime numbers."
      }
    ],
    videos: [
      { title: "Cryptography & Cybersecurity", duration: "32:45", youtubeId: "N3k7DG1K-f8", views: "980K views" }
    ]
  },
  {
    id: "int407",
    code: "INT407",
    name: "Cloud Computing",
    semester: 7,
    credits: 3,
    syllabus: "Cloud virtualization, SaaS, PaaS, IaaS models, hypervisors, AWS core services (EC2, S3, RDS, IAM), cloud security, containerization (Docker), and serverless architectures.",
    notes: [
      { unit: 1, title: "Unit 1: Virtualization & Models", description: "Type 1 & Type 2 Hypervisors, Public, Private, and Hybrid Cloud architectures." }
    ],
    pyqs: [
      { year: "2024", type: "End-Term", filename: "INT407_Endterm_2024.pdf" }
    ],
    mcqs: [
      {
        id: "int407_q1",
        question: "Which of the following is an example of an IaaS (Infrastructure as a Service) solution?",
        options: ["Google Docs", "AWS EC2", "Heroku", "Microsoft Office 365"],
        answer: 1,
        explanation: "AWS EC2 provides virtual servers (compute infrastructure) to users, making it an Infrastructure as a Service (IaaS)."
      }
    ],
    videos: [
      { title: "Cloud Computing Course", duration: "45:10", youtubeId: "2LaAJq1lB1Q", views: "1.5M views" }
    ]
  },

  // Semester 8
  {
    id: "cse499",
    code: "CSE499",
    name: "Capstone Project & Professional Ethics",
    semester: 8,
    credits: 6,
    syllabus: "Project proposal, feasibility studies, agile project execution, code testing, deployment metrics, report submission, and professional computer ethics guidelines.",
    notes: [
      { unit: 1, title: "Unit 1: Project Scoping & Planning", description: "Gantt charts, SRS writing, prototyping, and risk management parameters." }
    ],
    pyqs: [
      { year: "2023", type: "Final evaluation rubric", filename: "CSE499_EvaluationRubric.pdf" }
    ],
    mcqs: [
      {
        id: "cse499_q1",
        question: "Which diagram is ideal for visualizing project schedules and task timelines?",
        options: ["Use Case Diagram", "ER Diagram", "Gantt Chart", "Data Flow Diagram"],
        answer: 2,
        explanation: "A Gantt chart is a type of bar chart that illustrates a project schedule, showing start/finish dates of task elements."
      }
    ],
    videos: [
      { title: "How to Build a Capstone Project", duration: "18:30", youtubeId: "aU9lC7C9xK4", views: "240K views" }
    ]
  },
  {
    id: "cse433",
    code: "CSE433",
    name: "Machine Learning",
    semester: 8,
    credits: 3,
    syllabus: "Supervised learning (Linear/Logistic Regression, Decision Trees, SVM, KNN), Unsupervised learning (K-Means, PCA), Neural Networks basics, model evaluation metrics (precision, recall, F1, ROC).",
    notes: [
      { unit: 1, title: "Unit 1: Supervised vs Unsupervised Learning", description: "Regression, classification, clustering, cost function, and gradient descent optimization." }
    ],
    pyqs: [
      { year: "2024", type: "End-Term", filename: "CSE433_Endterm_2024.pdf" }
    ],
    mcqs: [
      {
        id: "cse433_q1",
        question: "What metric is best for evaluating a model on an imbalanced classification dataset?",
        options: ["Accuracy", "F1 Score", "MSE", "R-squared"],
        answer: 1,
        explanation: "Accuracy is misleading for imbalanced data. F1-Score (harmonic mean of Precision and Recall) provides a much better evaluation metric."
      }
    ],
    videos: [
      { title: "Machine Learning for Beginners", duration: "50:20", youtubeId: "GwIo3gDZUtQ", views: "3.2M views" }
    ]
  }
];

export const mockCommunityLinks = {
  telegram: "https://t.me/whcode_lpu_community",
  discord: "https://discord.gg/whcode_lpu",
  whatsapp: "https://chat.whatsapp.com/whcode_lpu_notes",
  syllabusTracker: "https://econnect.lpu.in",
  umsLogin: "https://ums.lpu.in/ums"
};
