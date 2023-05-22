--
-- PostgreSQL database dump
--

-- Dumped from database version 15.3
-- Dumped by pg_dump version 15.3

-- Started on 2023-05-22 20:17:44

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
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
-- TOC entry 214 (class 1259 OID 16416)
-- Name: sessions; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.sessions (
    token uuid,
    "userId" integer
);


ALTER TABLE public.sessions OWNER TO postgres;

--
-- TOC entry 218 (class 1259 OID 16447)
-- Name: shortenedURLs; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."shortenedURLs" (
    id integer NOT NULL,
    url text,
    "shortenedUrl" text,
    "userId" integer,
    "visitCounter" integer DEFAULT 0
);


ALTER TABLE public."shortenedURLs" OWNER TO postgres;

--
-- TOC entry 217 (class 1259 OID 16446)
-- Name: shortenedURLs_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."shortenedURLs_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."shortenedURLs_id_seq" OWNER TO postgres;

--
-- TOC entry 3341 (class 0 OID 0)
-- Dependencies: 217
-- Name: shortenedURLs_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."shortenedURLs_id_seq" OWNED BY public."shortenedURLs".id;


--
-- TOC entry 216 (class 1259 OID 16429)
-- Name: users; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.users (
    id integer NOT NULL,
    name text,
    email text,
    password text
);


ALTER TABLE public.users OWNER TO postgres;

--
-- TOC entry 215 (class 1259 OID 16428)
-- Name: users_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.users_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.users_id_seq OWNER TO postgres;

--
-- TOC entry 3342 (class 0 OID 0)
-- Dependencies: 215
-- Name: users_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.users_id_seq OWNED BY public.users.id;


--
-- TOC entry 3183 (class 2604 OID 16450)
-- Name: shortenedURLs id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."shortenedURLs" ALTER COLUMN id SET DEFAULT nextval('public."shortenedURLs_id_seq"'::regclass);


--
-- TOC entry 3182 (class 2604 OID 16432)
-- Name: users id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users ALTER COLUMN id SET DEFAULT nextval('public.users_id_seq'::regclass);


--
-- TOC entry 3331 (class 0 OID 16416)
-- Dependencies: 214
-- Data for Name: sessions; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.sessions (token, "userId") FROM stdin;
ef682065-4c32-4a8b-974f-a9e93539eda4	1
0c5327d5-97c6-45fc-a89c-a2c11abe1d8a	2
\.


--
-- TOC entry 3335 (class 0 OID 16447)
-- Dependencies: 218
-- Data for Name: shortenedURLs; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."shortenedURLs" (id, url, "shortenedUrl", "userId", "visitCounter") FROM stdin;
2	https://www.google.com	OCr_LOn6pa	2	9
3	https://www.youtube.com	-zRY9aNHOD	1	1
5	https://www.driven.com.br	S4kP0ebSRq	2	2
\.


--
-- TOC entry 3333 (class 0 OID 16429)
-- Dependencies: 216
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.users (id, name, email, password) FROM stdin;
1	João	joao@driven.com.br	$2b$10$oLxC8EODRk2eZ34XTuGXZeUc0JwR8b/wXPwK4XssNquFp4plbzeOy
2	Zé	zé@driven.com.br	$2b$10$GQm05StbfToUC3gAg3ZXJO7IbbFGWNoASnkgUmNRh2OCVN8Aw2IaW
\.


--
-- TOC entry 3343 (class 0 OID 0)
-- Dependencies: 217
-- Name: shortenedURLs_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."shortenedURLs_id_seq"', 5, true);


--
-- TOC entry 3344 (class 0 OID 0)
-- Dependencies: 215
-- Name: users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.users_id_seq', 2, true);


--
-- TOC entry 3188 (class 2606 OID 16455)
-- Name: shortenedURLs shortenedURLs_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."shortenedURLs"
    ADD CONSTRAINT "shortenedURLs_pkey" PRIMARY KEY (id);


--
-- TOC entry 3186 (class 2606 OID 16436)
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


-- Completed on 2023-05-22 20:17:45

--
-- PostgreSQL database dump complete
--

