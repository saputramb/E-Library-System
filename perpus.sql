PGDMP     
    4            
    {            perpus    15.1    15.1     ,           0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                      false            -           0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                      false            .           0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                      false            /           1262    151036    perpus    DATABASE     }   CREATE DATABASE perpus WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE_PROVIDER = libc LOCALE = 'English_Indonesia.1252';
    DROP DATABASE perpus;
                postgres    false            �            1255    151108    func_auto_book_code()    FUNCTION     �  CREATE FUNCTION public.func_auto_book_code() RETURNS trigger
    LANGUAGE plpgsql
    AS $$
DECLARE
  v_book_code int := 0;
BEGIN
  SELECT COUNT(category) + 1 INTO v_book_code FROM book 
  WHERE category = NEW.category;
  IF v_book_code IS NULL THEN
  NEW.book_code := NEW.category || '-' || to_char(1, 'fm00');
ELSE
  NEW.book_code := NEW.category || '-' || to_char(v_book_code, 'fm00');
END IF;
RETURN NEW;
END;
$$;
 ,   DROP FUNCTION public.func_auto_book_code();
       public          postgres    false            �            1259    151118    book    TABLE     �  CREATE TABLE public.book (
    book_code character varying(64) NOT NULL,
    category character varying(64) NOT NULL,
    title text NOT NULL,
    author character varying(64) NOT NULL,
    publication_year character varying(64) NOT NULL,
    book text NOT NULL,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);
    DROP TABLE public.book;
       public         heap    postgres    false            �            1259    151250    dmv_book    VIEW     �   CREATE VIEW public.dmv_book AS
 SELECT book.book_code,
    book.category,
    book.title,
    book.author,
    book.publication_year,
    book.book,
    book.created_at,
    book.updated_at
   FROM public.book;
    DROP VIEW public.dmv_book;
       public          postgres    false    217    217    217    217    217    217    217    217            �            1259    151160    history_book_id_seq    SEQUENCE     |   CREATE SEQUENCE public.history_book_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 *   DROP SEQUENCE public.history_book_id_seq;
       public          postgres    false            �            1259    151150    history_book    TABLE     �  CREATE TABLE public.history_book (
    id numeric DEFAULT nextval('public.history_book_id_seq'::regclass) NOT NULL,
    book_code character varying(64) NOT NULL,
    borrower_id numeric NOT NULL,
    date timestamp without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    remarks character varying(64) NOT NULL,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);
     DROP TABLE public.history_book;
       public         heap    postgres    false    219            �            1259    151086    users_id_seq    SEQUENCE     u   CREATE SEQUENCE public.users_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 #   DROP SEQUENCE public.users_id_seq;
       public          postgres    false            �            1259    151077    users    TABLE     &  CREATE TABLE public.users (
    id numeric DEFAULT nextval('public.users_id_seq'::regclass) NOT NULL,
    name character varying(64) NOT NULL,
    email character varying(64) NOT NULL,
    phone character varying(64) NOT NULL,
    gender character varying(64) NOT NULL,
    address text NOT NULL,
    role character varying(64) NOT NULL,
    password text NOT NULL,
    refresh_token text,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);
    DROP TABLE public.users;
       public         heap    postgres    false    215            �            1259    151245    dmv_history_book    VIEW     r  CREATE VIEW public.dmv_history_book AS
 WITH history AS (
         SELECT history_book.id,
            history_book.book_code,
            history_book.borrower_id,
            history_book.date,
            history_book.remarks
           FROM public.history_book
        ), book AS (
         SELECT book_1.book_code,
            book_1.category,
            book_1.title,
            book_1.author,
            book_1.publication_year,
            book_1.book
           FROM public.book book_1
        ), users AS (
         SELECT users_1.id,
            users_1.name,
            users_1.email,
            users_1.phone,
            users_1.gender,
            users_1.address,
            users_1.role
           FROM public.users users_1
        )
 SELECT history.id,
    book.book_code,
    book.title AS book_title,
    book.author,
    book.publication_year AS year_of_book_publication,
    book.book,
    users.name AS borrower,
    history.date,
    history.remarks
   FROM ((history
     LEFT JOIN book ON (((book.book_code)::text = (history.book_code)::text)))
     LEFT JOIN users ON ((users.id = history.borrower_id)));
 #   DROP VIEW public.dmv_history_book;
       public          postgres    false    217    217    217    217    218    218    218    218    218    214    214    214    214    214    214    214    217    217            �            1259    151254    dmv_books_borrowed    VIEW     I  CREATE VIEW public.dmv_books_borrowed AS
 SELECT history.id,
    history.book_code,
    history.book_title,
    history.author,
    history.year_of_book_publication,
    history.book,
    history.borrower,
    history.date,
    history.remarks
   FROM ( SELECT dmv_history_book.id,
            dmv_history_book.book_code,
            dmv_history_book.book_title,
            dmv_history_book.author,
            dmv_history_book.year_of_book_publication,
            dmv_history_book.book,
            dmv_history_book.borrower,
            dmv_history_book.date,
            dmv_history_book.remarks,
            row_number() OVER (PARTITION BY dmv_history_book.borrower ORDER BY dmv_history_book.date DESC) AS rn
           FROM public.dmv_history_book) history
  WHERE ((history.rn = 1) AND ((history.remarks)::text = 'BORROWED'::text));
 %   DROP VIEW public.dmv_books_borrowed;
       public          postgres    false    220    220    220    220    220    220    220    220    220            �            1259    151097 	   dmv_users    VIEW     �   CREATE VIEW public.dmv_users AS
 SELECT users.id,
    users.name,
    users.email,
    users.phone,
    users.gender,
    users.address,
    users.role,
    users.created_at
   FROM public.users;
    DROP VIEW public.dmv_users;
       public          postgres    false    214    214    214    214    214    214    214    214            '          0    151118    book 
   TABLE DATA           r   COPY public.book (book_code, category, title, author, publication_year, book, created_at, updated_at) FROM stdin;
    public          postgres    false    217   %+       (          0    151150    history_book 
   TABLE DATA           i   COPY public.history_book (id, book_code, borrower_id, date, remarks, created_at, updated_at) FROM stdin;
    public          postgres    false    218   �,       %          0    151077    users 
   TABLE DATA              COPY public.users (id, name, email, phone, gender, address, role, password, refresh_token, created_at, updated_at) FROM stdin;
    public          postgres    false    214   �,       0           0    0    history_book_id_seq    SEQUENCE SET     B   SELECT pg_catalog.setval('public.history_book_id_seq', 19, true);
          public          postgres    false    219            1           0    0    users_id_seq    SEQUENCE SET     :   SELECT pg_catalog.setval('public.users_id_seq', 6, true);
          public          postgres    false    215            �           2606    151124    book book1_pkey 
   CONSTRAINT     T   ALTER TABLE ONLY public.book
    ADD CONSTRAINT book1_pkey PRIMARY KEY (book_code);
 9   ALTER TABLE ONLY public.book DROP CONSTRAINT book1_pkey;
       public            postgres    false    217            �           2606    151159    history_book history_book_pkey 
   CONSTRAINT     \   ALTER TABLE ONLY public.history_book
    ADD CONSTRAINT history_book_pkey PRIMARY KEY (id);
 H   ALTER TABLE ONLY public.history_book DROP CONSTRAINT history_book_pkey;
       public            postgres    false    218            �           2606    151092    users users_email_key 
   CONSTRAINT     Q   ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key UNIQUE (email);
 ?   ALTER TABLE ONLY public.users DROP CONSTRAINT users_email_key;
       public            postgres    false    214            �           2606    151085    users users_pkey 
   CONSTRAINT     N   ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);
 :   ALTER TABLE ONLY public.users DROP CONSTRAINT users_pkey;
       public            postgres    false    214            �           2620    151125    book func_auto_book_code    TRIGGER     |   CREATE TRIGGER func_auto_book_code BEFORE INSERT ON public.book FOR EACH ROW EXECUTE FUNCTION public.func_auto_book_code();
 1   DROP TRIGGER func_auto_book_code ON public.book;
       public          postgres    false    217    223            �           2606    151202 (   history_book history_book_book_code_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.history_book
    ADD CONSTRAINT history_book_book_code_fkey FOREIGN KEY (book_code) REFERENCES public.book(book_code) ON UPDATE CASCADE ON DELETE CASCADE NOT VALID;
 R   ALTER TABLE ONLY public.history_book DROP CONSTRAINT history_book_book_code_fkey;
       public          postgres    false    218    3213    217            �           2606    151207 *   history_book history_book_borrower_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.history_book
    ADD CONSTRAINT history_book_borrower_id_fkey FOREIGN KEY (borrower_id) REFERENCES public.users(id) ON UPDATE CASCADE ON DELETE CASCADE NOT VALID;
 T   ALTER TABLE ONLY public.history_book DROP CONSTRAINT history_book_borrower_id_fkey;
       public          postgres    false    214    3211    218            '   [  x�}�Mo�@���+�ԓv�om�~ĈI/M�XV܀�d����;��K/��f�wf���`6�Ǭ�*��2�A�YËPU5(�Q��.E�C�%B�6��N�Π�&�a��lD��dsa��� U�Ѳ���@]�h��3�	��J�xċ�l�EZ���b�� �Yȣ��k];lZ����(v�/��
Ng1�S�-c�ws��`�3�A$	�S���K �]/N�VmN���j3�_T{+4�.2��ϲ����Z7x��1��iy������HV��ʐ�u0�	or��zKU���Q�E�z	��i���QJ�8��J~�D~�0g3�H2c�ű��;%�ݵm��I��      (      x������ � �      %   �   x���Mo�0 ������զ��&v[M@3'c��R:ā�Z���Oc�-fy���>���e[o���jU� �m�Կ��D5̷��MԷ�N]u���#���,�a�ʟ%#��o9�F���������gU��&s�x�)���>!}�{x0�|�"�G�s� ,�Ƃ���ط��٨ډ��G�����i�Ki�2��gE>{��'�����?{Y�HHY��\p� ���Aa�     