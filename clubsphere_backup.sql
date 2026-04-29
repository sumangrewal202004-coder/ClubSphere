--
-- PostgreSQL database dump
--

\restrict yS64lqJIdbkeWVy9zN6GgY1rQUdvgFzDsXfrLjT8W2QckMMT5G1gQXC7bi5lXyi

-- Dumped from database version 18.3
-- Dumped by pg_dump version 18.3

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: applications; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.applications (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    student_id uuid NOT NULL,
    club_id uuid NOT NULL,
    cv_path text NOT NULL,
    ai_score integer,
    ai_feedback text,
    status text DEFAULT 'pending'::text,
    applied_at timestamp with time zone DEFAULT now(),
    CONSTRAINT applications_status_check CHECK ((status = ANY (ARRAY['pending'::text, 'approved'::text, 'rejected'::text])))
);


--
-- Name: clubs; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.clubs (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    name text NOT NULL,
    description text,
    college_id uuid NOT NULL,
    manager_id uuid NOT NULL,
    requirements text,
    created_at timestamp with time zone DEFAULT now()
);


--
-- Name: college_documents; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.college_documents (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    college_id uuid,
    file_path text
);


--
-- Name: colleges; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.colleges (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    name text NOT NULL,
    domain text NOT NULL,
    email text,
    phone text,
    status text DEFAULT 'pending'::text,
    created_at timestamp without time zone DEFAULT now(),
    website text,
    address text,
    college_type text,
    reg_number text,
    accreditation text,
    university_affiliation text,
    year_established integer,
    CONSTRAINT colleges_college_type_check CHECK ((college_type = ANY (ARRAY['government'::text, 'private'::text, 'autonomous'::text]))),
    CONSTRAINT colleges_year_established_check CHECK (((year_established >= 1800) AND (year_established <= 2100)))
);


--
-- Name: event_registrations; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.event_registrations (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    event_id uuid,
    student_id uuid,
    registered_at timestamp with time zone DEFAULT now()
);


--
-- Name: events; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.events (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    club_id uuid NOT NULL,
    title text NOT NULL,
    description text,
    venue text,
    event_date timestamp with time zone NOT NULL,
    created_at timestamp with time zone DEFAULT now()
);


--
-- Name: notifications; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.notifications (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    user_id uuid,
    message text,
    is_read boolean DEFAULT false,
    created_at timestamp with time zone DEFAULT now()
);


--
-- Name: otp_table; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.otp_table (
    id integer NOT NULL,
    email text,
    otp text,
    created_at timestamp without time zone DEFAULT now(),
    expires_at timestamp without time zone
);


--
-- Name: otp_table_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.otp_table_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: otp_table_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.otp_table_id_seq OWNED BY public.otp_table.id;


--
-- Name: users; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.users (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    email text NOT NULL,
    password_hash text NOT NULL,
    role text NOT NULL,
    name text,
    college_id uuid,
    created_at timestamp with time zone DEFAULT now(),
    CONSTRAINT users_role_check CHECK ((role = ANY (ARRAY['college'::text, 'club_manager'::text, 'student'::text, 'super_admin'::text])))
);


--
-- Name: otp_table id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.otp_table ALTER COLUMN id SET DEFAULT nextval('public.otp_table_id_seq'::regclass);


--
-- Data for Name: applications; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.applications (id, student_id, club_id, cv_path, ai_score, ai_feedback, status, applied_at) FROM stdin;
0c1d97a0-cbc2-4be3-8be4-075f38efd2a7	253a3848-1b99-4499-9cc1-89e408d9bcf3	20a23e76-2682-4c4f-a266-7b8a75e8dad5	uploads\\1776496525204.pdf	\N	\N	pending	2026-04-18 12:45:25.386852+05:30
a46fbd9d-cd90-4c16-8e39-71876bf43d60	253a3848-1b99-4499-9cc1-89e408d9bcf3	20a23e76-2682-4c4f-a266-7b8a75e8dad5	uploads\\1776498616890.pdf	\N	\N	pending	2026-04-18 13:20:16.958948+05:30
7f5400a6-228b-4e96-b2af-fd486a9317f4	253a3848-1b99-4499-9cc1-89e408d9bcf3	20a23e76-2682-4c4f-a266-7b8a75e8dad5	uploads\\1776499407017.pdf	\N	\N	pending	2026-04-18 13:33:27.084622+05:30
1d176973-8672-46c5-9800-59d329644d08	253a3848-1b99-4499-9cc1-89e408d9bcf3	20a23e76-2682-4c4f-a266-7b8a75e8dad5	uploads\\1776500104075.pdf	\N	\N	pending	2026-04-18 13:45:04.152339+05:30
eb6227ca-1b83-48f0-943f-d6f63cdb56ac	253a3848-1b99-4499-9cc1-89e408d9bcf3	20a23e76-2682-4c4f-a266-7b8a75e8dad5	uploads\\1776500360035.pdf	\N	\N	pending	2026-04-18 13:49:20.244863+05:30
d26378bf-de1a-4749-8d0e-4033c9820ced	253a3848-1b99-4499-9cc1-89e408d9bcf3	20a23e76-2682-4c4f-a266-7b8a75e8dad5	uploads\\1776500555459.pdf	\N	\N	pending	2026-04-18 13:52:35.519686+05:30
cf13003c-ba26-427e-9f6b-4e008d7ed8bd	253a3848-1b99-4499-9cc1-89e408d9bcf3	20a23e76-2682-4c4f-a266-7b8a75e8dad5	uploads\\1776500779445.pdf	\N	\N	pending	2026-04-18 13:56:19.517196+05:30
55047ee1-ce1b-4eb1-9118-259af4d72ae4	253a3848-1b99-4499-9cc1-89e408d9bcf3	20a23e76-2682-4c4f-a266-7b8a75e8dad5	uploads\\1776502700794.pdf	\N	\N	pending	2026-04-18 14:28:20.884016+05:30
bdf1bdcd-c0c2-4ff1-9296-58975e888cb4	253a3848-1b99-4499-9cc1-89e408d9bcf3	20a23e76-2682-4c4f-a266-7b8a75e8dad5	uploads\\1776503045110.pdf	0	AI evaluation failed	pending	2026-04-18 14:34:05.169298+05:30
c7159f51-842a-40f8-9b0c-ce34be3b0f89	253a3848-1b99-4499-9cc1-89e408d9bcf3	20a23e76-2682-4c4f-a266-7b8a75e8dad5	uploads\\1776503392116.pdf	0	AI evaluation failed	pending	2026-04-18 14:39:52.164645+05:30
acef1644-8686-49d5-b2ec-901cf52bb541	253a3848-1b99-4499-9cc1-89e408d9bcf3	20a23e76-2682-4c4f-a266-7b8a75e8dad5	uploads\\1776503707121.pdf	90	Strong CV, well-structured, and comprehensive. Meets most of the club requirements, with proficiency in React basics and other related technologies. However, some details could be more concise, and there's room for improvement in linking projects directly to the required skills.	approved	2026-04-18 14:45:07.182167+05:30
9efaf043-9454-4bf6-8ad7-afa01ae8b3e4	e7fa8e8a-b5b0-42da-aae3-66b477233e02	2487c1a1-12c8-471d-a917-cddf2ae3e2e6	uploads\\1777299059239.pdf	80	Good technical skills as demonstrated by experience with React, JavaScript, and C++. Excellent extracurricular activities, including leadership roles in the training and placement cell. Strengths also include good time management skills, shown through multiple projects and course work. Weakness areas include a somewhat lengthy CV with minor repetition in work experience section, also a need for some quantitative metrics in achievements	pending	2026-04-27 19:40:59.300456+05:30
\.


--
-- Data for Name: clubs; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.clubs (id, name, description, college_id, manager_id, requirements, created_at) FROM stdin;
20a23e76-2682-4c4f-a266-7b8a75e8dad5	Coding Club	For coding enthusiasts	fa48e280-a8c9-490a-be0d-41a0074b5172	fa48e280-a8c9-490a-be0d-41a0074b5172	Knowledge of JavaScript, React basics	2026-04-18 11:42:28.223315+05:30
2487c1a1-12c8-471d-a917-cddf2ae3e2e6	Tech Innovators Club	A community of students passionate about technology, innovation, and problem-solving. The club focuses on coding, hackathons, real-world projects, and learning emerging technologies like AI, web development, and cloud computing. Members collaborate, build projects, and participate in competitions to enhance their technical skills.	ee0c23f9-896d-4068-853d-a7dcdd8c5e5e	7b7511b0-7ac8-448d-891c-ddc93fdfd33a	Looking for students with basic to intermediate programming knowledge in languages like JavaScript, Python, or C++. Applicants should have strong problem-solving skills, logical thinking, and a willingness to learn. Preference will be given to students who have worked on personal or academic projects, participated in hackathons, or contributed to open-source. Good communication and teamwork skills are a plus.	2026-04-27 19:32:20.573296+05:30
\.


--
-- Data for Name: college_documents; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.college_documents (id, college_id, file_path) FROM stdin;
97e24992-f2c7-450d-a474-d17feb5f3a10	baeaf901-ec91-45c9-a422-8f7282e395a9	C:\\Users\\grewa\\OneDrive\\Documents\\ClubSphere\\clubSphere-backend\\uploads\\1777291138186-Dummy_UGC_Approval.pdf
\.


--
-- Data for Name: colleges; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.colleges (id, name, domain, email, phone, status, created_at, website, address, college_type, reg_number, accreditation, university_affiliation, year_established) FROM stdin;
baeaf901-ec91-45c9-a422-8f7282e395a9	ABC College	gmail.com	sumangrewal202004@gmail.com	+919814394402	approved	2026-04-27 17:28:58.26156	http://localhost:5173	ABC City, XYZ District	government	UGC/908/GUI/001	NAAC A+	PTU	1956
\.


--
-- Data for Name: event_registrations; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.event_registrations (id, event_id, student_id, registered_at) FROM stdin;
\.


--
-- Data for Name: events; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.events (id, club_id, title, description, venue, event_date, created_at) FROM stdin;
\.


--
-- Data for Name: notifications; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.notifications (id, user_id, message, is_read, created_at) FROM stdin;
c0481be2-8919-4d0e-a95a-73181257ff9c	e7fa8e8a-b5b0-42da-aae3-66b477233e02	Your CV for club application has been evaluated. Score: 85/100	t	2026-04-27 18:02:22.073499+05:30
cee5aabc-eaf5-42ae-afbb-f6de18d5711a	e7fa8e8a-b5b0-42da-aae3-66b477233e02	Your application has been received and is under review. You will be notified if you are selected.	t	2026-04-27 19:41:00.212084+05:30
\.


--
-- Data for Name: otp_table; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.otp_table (id, email, otp, created_at, expires_at) FROM stdin;
\.


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.users (id, email, password_hash, role, name, college_id, created_at) FROM stdin;
253a3848-1b99-4499-9cc1-89e408d9bcf3	student1@test.com	$2b$10$Ynw4GdNcxHnT.u6GyGhc2uoqF4NHd7iVbK1rms0Lm2gUQBQLT9E5C	student	Suman	\N	2026-04-18 11:14:11.919665+05:30
fa48e280-a8c9-490a-be0d-41a0074b5172	college@test.com	$2b$10$EfhTFSEeONf9PoDd/g2QBu67dHMzDOuI5qq3U6cx0vA/lBzq1zkE6	college	ABC College	\N	2026-04-18 11:40:25.489343+05:30
e5d728f7-e8ec-4e4b-8294-d7006ef4c738	manager@test.com	$2b$10$dl7kzJfGjAVWpuEWLgnwc.e7DnHmpg.ZrOUtAY9oewUigaR/9o4.6	club_manager	Suman	\N	2026-04-18 14:54:23.603128+05:30
77fd3c8e-6fdd-4648-82fa-5399cbc2578d	suman@test.com	$2b$10$0zevQg3aeUM5CNPXcAP15OceVE/icr.h6EINPoFsHe4M49nwRdpF.	student	Suman	\N	2026-04-19 12:11:31.567042+05:30
9ff31896-392b-4061-9039-959d802217d4	club@test.com	$2b$10$5NOLzNNFYj7ldlb/VL8pIO9TBeZOrt2Rf62HOIjTp5AJMlhTmmUE6	club_manager	club 	\N	2026-04-19 12:19:49.829535+05:30
d25e0cc9-9dc1-44fa-8f52-bd2c4ae8f21d	gne@test.com	$2b$10$rrBBOH8h3yHhpBZbJjCs8OX2lezwCBirrswQIJXn4I3JfCQnh5rz2	college	gne	\N	2026-04-19 12:21:29.277313+05:30
3b345423-9384-4166-939b-2104d7e1d2b6	admin@clubsphere.com	hashedpassword	super_admin	\N	\N	2026-04-23 10:35:56.696196+05:30
1a96e9f6-ece3-4885-afd5-552b7818c24b	sumandeepkaur20048@gmail.com	$2b$10$bHohRgriM1znbD.ABTF0buhSUYrUMteClWBMw8Gq8uI/1m/gMCxu	super_admin	\N	\N	2026-04-23 11:15:10.806135+05:30
c3386381-dfb9-47e6-83cc-8cd35b6e3eb0	grewalsumandeepkaur78@gmail.com	$2b$10$ggaiGDKYtOrTa4AsisnM5.pHxzBaYNu52Tvlub312ap6oaYlEBoCK	club_manager	suman	\N	2026-04-25 16:59:30.29288+05:30
ee0c23f9-896d-4068-853d-a7dcdd8c5e5e	sumangrewal202004@gmail.com	$2b$10$qLcfUL6PpwvRt/z7Uc7M0.YBlNCKFytF4IMPYxfWMr8F3q/kbOzYK	college	ABC College	\N	2026-04-27 17:28:58.503927+05:30
e7fa8e8a-b5b0-42da-aae3-66b477233e02	grewalsumandeepkaur4@gmail.com	$2b$10$hXp/WOaXG69WkAlSYdpcxee6DSABo71WYSq4LFm6t6ry8HP6yu2rS	student	Suman Grewal	ee0c23f9-896d-4068-853d-a7dcdd8c5e5e	2026-04-27 17:54:44.498305+05:30
2653c1c3-4d5a-4991-ac2b-3281bcc0801e	sharmadhruv102003@gmail.com	$2b$10$YetbraFCOOJOFBPyXgM1DuuReT0aRINLqyhQ/FQ/.miyUr1MYghqa	club_manager	Dhruv	\N	2026-04-27 21:24:09.599225+05:30
7b7511b0-7ac8-448d-891c-ddc93fdfd33a	siya40216@gmail.com	$2b$10$nznwlzRri2Y/MQn7na1T4.h2FzHkfmCrOkpbmuox9eX6v/RheAXh6	club_manager	Siya	ee0c23f9-896d-4068-853d-a7dcdd8c5e5e	2026-04-27 19:28:59.699393+05:30
\.


--
-- Name: otp_table_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.otp_table_id_seq', 127, true);


--
-- Name: applications applications_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.applications
    ADD CONSTRAINT applications_pkey PRIMARY KEY (id);


--
-- Name: clubs clubs_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.clubs
    ADD CONSTRAINT clubs_pkey PRIMARY KEY (id);


--
-- Name: college_documents college_documents_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.college_documents
    ADD CONSTRAINT college_documents_pkey PRIMARY KEY (id);


--
-- Name: colleges colleges_domain_key; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.colleges
    ADD CONSTRAINT colleges_domain_key UNIQUE (domain);


--
-- Name: colleges colleges_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.colleges
    ADD CONSTRAINT colleges_pkey PRIMARY KEY (id);


--
-- Name: event_registrations event_registrations_event_id_student_id_key; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.event_registrations
    ADD CONSTRAINT event_registrations_event_id_student_id_key UNIQUE (event_id, student_id);


--
-- Name: event_registrations event_registrations_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.event_registrations
    ADD CONSTRAINT event_registrations_pkey PRIMARY KEY (id);


--
-- Name: events events_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.events
    ADD CONSTRAINT events_pkey PRIMARY KEY (id);


--
-- Name: notifications notifications_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.notifications
    ADD CONSTRAINT notifications_pkey PRIMARY KEY (id);


--
-- Name: otp_table otp_table_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.otp_table
    ADD CONSTRAINT otp_table_pkey PRIMARY KEY (id);


--
-- Name: users users_email_key; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key UNIQUE (email);


--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- Name: applications applications_club_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.applications
    ADD CONSTRAINT applications_club_id_fkey FOREIGN KEY (club_id) REFERENCES public.clubs(id);


--
-- Name: applications applications_student_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.applications
    ADD CONSTRAINT applications_student_id_fkey FOREIGN KEY (student_id) REFERENCES public.users(id);


--
-- Name: clubs clubs_college_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.clubs
    ADD CONSTRAINT clubs_college_id_fkey FOREIGN KEY (college_id) REFERENCES public.users(id);


--
-- Name: clubs clubs_manager_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.clubs
    ADD CONSTRAINT clubs_manager_id_fkey FOREIGN KEY (manager_id) REFERENCES public.users(id);


--
-- Name: college_documents college_documents_college_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.college_documents
    ADD CONSTRAINT college_documents_college_id_fkey FOREIGN KEY (college_id) REFERENCES public.colleges(id);


--
-- Name: event_registrations event_registrations_event_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.event_registrations
    ADD CONSTRAINT event_registrations_event_id_fkey FOREIGN KEY (event_id) REFERENCES public.events(id);


--
-- Name: event_registrations event_registrations_student_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.event_registrations
    ADD CONSTRAINT event_registrations_student_id_fkey FOREIGN KEY (student_id) REFERENCES public.users(id);


--
-- Name: events events_club_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.events
    ADD CONSTRAINT events_club_id_fkey FOREIGN KEY (club_id) REFERENCES public.clubs(id);


--
-- Name: notifications notifications_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.notifications
    ADD CONSTRAINT notifications_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id);


--
-- Name: users users_college_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_college_id_fkey FOREIGN KEY (college_id) REFERENCES public.users(id);


--
-- PostgreSQL database dump complete
--

\unrestrict yS64lqJIdbkeWVy9zN6GgY1rQUdvgFzDsXfrLjT8W2QckMMT5G1gQXC7bi5lXyi

