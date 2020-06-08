###### End to End Encryption (E2EE)
# Cuándo las matemáticas son ilegales

Intro política
La encriptación no es más que cuentas matemáticas. Cuentas con propiedades particulares, inventadas o descubiertas, según quien pregunte. 

Cuentas que tienen propiedades especiales y permiten, entre otras cosas, mantener la privacidad en WhatsApp, el famoso candadito
Hay gobiernos que luchan contra ese candadito, con el argumento de "hay criminales que usan este sistema de mensajería para llevar a cabo sus rufianerías". Que es cierto, este sistema de anonimato permite que cualquier persona se comunique con cualquier otra, y mantener la privacidad de los mensajes dureante la conversación.

Los goviernos no quieren que haya encriptación, o quieren poder estar por ensima de esta encriptación, y romperla cuando sea necesario.

#### Matemática discreta
No nos extenderemos demasiado en esto, pero es necesario que nombremos algunas operaciones que usaremos a lo largo del artículo.

Usaremos *mod*, que significa módulo, por ejemplo 5 = 1 mod 2. En criptografía se usa la operación módulo para crear algo análogo a "espacios de movimiento", por ejemplo, el "espacio de movimiento" mod 5 es {0,1,2,3,4}, reduce todos los enteros a 5 posibilidades. Esto por ejemplo simplifica operaciones con expoentes de números ridículos.

Luego usaremos el concepto de cíclos, Zp y Zp*, que no explicaremos; basta con decir que son subconjuntos de los enteros (Z) menores a un primo (p), con propiedades particulares, como invertibilidad.

Invitamos a profundizar en esto; la matemática es un estudio fascinante.

#### xor & OTP
Si explicaremos con más detalle la operación *or exclusivo* (*xor*), que es una operación booleana con la siguiente tabla de valor:
| xor | 0 | 1 | 
|---------|---------|---------| 
| 0 | 0 | 1 | 
| 1 | 1 | 0 | 
*Xor* es la operación más usada en criptografía, ya que *xor* es invertible y simula aleatoriedad. Hay un dicho que dice: "lo único que hacen los criptógrafos es operaciones *xor*". Y sorprendería qué tanto de eso es cierto; la gran mayoría de los protocolos de encriptación y hasheo que usamos (y hasta ignoramos usar), se reducen a no más que una cadena de *xor*. ¿Por qué se usa tanto? 

Invertibilidad: es la única operación en la que cada bit tiene 50% de probabilidad de resultar en cualquier otro valor. Es decir, si te doy un 1, hay 50% probabilidad de que el sea 1 o 0, y viceversa. Entonces, si usamos cualquier hilo de bits y lo operamos con un número perceptiblemente aleatorio (pseudo-random), producimos un resultado también perceptblemente random.
Invertible: veamos un ejemplo, si opero dos hilos (m) = 11011000 y (k) = 10100111, me dá ( c ) = 01111111; y si opero este resultado por cualquiera de los anteriores, me dá el otro. Es decir, m xor k = c, c xor k = m. Veamos un ejemplo:
```
m- 11011000  xor
k- 10100111
-----------
c- 01111111  xor
k- 10100111
-----------
m- 11011000  xor
c- 01111111
-----------
k- 10100111
... para cada combinación
```

Y así llegamos a uno de los protocolos de encriptación más básico que existe: One Time Pad (OTP). Originalmente invetado en 1882 por Frank Miller, y re-descubierto en 1917 por Gilbert Vernam, quien definitivamente patentó su invensión.

En realidad el OTP es muy simple, y acabamos de ver un ejemplo cuando describíamos xor. Si queremos encriptar un mensaje (m), generamos una clave (k) del mismo largo del mensaje, y los operamos con xor produciendo un *ciphertext* ( c ).

Por las propiedades del *xor*, este protocolo de encriptado es muy seguro, si se usa bien, pero es muy difícil de usar bien. Por un lado, las claves han de ser del mismo tamaño que los mensajes. Por otro lado, hay que generar una clave nueva para cada mensaje (de ahí el nombre). También resulta muy fácil interferir con los datos, aunque no sepamos *qué* son, ya que sabemos *donde* están. Nosotros más adelante, cuando expliquemos el manejo de claves, vamos a usar OTP exactamente de la manera más insegura posible. Lo vamos a hacer porque es muy fácil de usar, y sirve para nuestros ejemplos. Imaginen que en el lugar de OTP, un servidor real usa un protocolo seguro como AES.

#### Clave simétrica
OTP es un protocolo de clave simétrica. Es decir, que la misma clave se usa para encriptar y desencriptar. Esto implica que existe tal cosa como claves asimétricas, pero no nos detendremos en ellas.
_

Ahora, asumamos que tenemos una aplicación de mensajería, como puede ser WhatsApp o MSN, hsoteada en un servidor. Alice y Bob son dos amigos que quieren charlar, y van a usar nuestra app. Sabemos que el internet es un lugar relativamente inseguro, por lo que nuestra app encripta los mensajes antes de enviarlos. Veamos la primera manera de encriptar estos datos:

Una manera fácil de encriptar esos datos es con claves simétricas entre los usuarios y el servidor. En el momento de conexión inicial, Alice envía una clave (número) generada localmente al servidor y así establece una clave simétrica KAS (Key-Alice-Server), y Bob hace lo mismo (en un caso real, esta clave viajaría encriptada con una clave asimétrica, pero obviaremos esto). Ahora, cada vez que Alice quiera enviar un mensaje a Bob:
1. Alice encripta su mensaje con su clave KAS.
2. El ciphertext viaja por internet al servidor.
3. El servidor desencripta el mensaje con la clave KAS.
4. El servidor encripta el mensaje con la clave KBS.
5. El nuevo cipertext viaja por internet a Bob.
6. Bob desencripta el mensaje con la clave KBS.

Aquí hay un ejemplo de este sistema. El caso empieza desde zero, asique deberán comenzar con el proceso de conexión inicial (crear y compartir KAS y KBS), luego pueden proceder a enviarse mensajes encriptados.

> ejemplo sin E2EE - non-dh.hmtl

Espero que hayan visto el problema de seguridad que tiene este sistema. El servidor lee todos nuestros los mensajes! Zero privacidad. Debemos confiar en un servidor y en la corporación que a) no lean nuestros mensajes b) no les vendan nuestros mensajes a un estado u otra corporación c) que nos los hackeen. Con un log de todos nuestros mensajes estamos generando un gran *single point of failure*, punto único que fracaso, y con grandes corporaciones con información valiosa, la pregunta no es "si" serán hackeados o vendidos al gobvierno, es "cuando" y "cuántas veces".

#### Diffie–Hellman
Por esto se crea el *End-to-end-encription* (E2EE) la encriptación de punta a punta, con la idea de que sólo Alice y Bob vean sus mensajes, y que el servidor sólo se encargue de reenviar un ciphertext que no puede leer. Pero, si el servidor por definición lee todo lo que le enviamos, ¿cómo podemos enviarle algo a Bob a través del servidor, que el servidor mismo no pueda desencriptar? Con matemática.

Whitfield Diffie y Martin Hellman crearon uno de los primeros y más usados protocolos para crear y compartir una clave (secreto) simétrico entre dos partes. A continuación esbozaremos el funcionamiento del protocolo y daremos un ejemplo para que puedan experimentar con claves Diffie-Hellman.

Alice y Bob se comunican a traves de un medio inseguro (el servidor) y quieren compartir un secreto privado. Para esto, convienen unos números públicos: ( p ) = número primo muy grande, (G) = generador del cíclo Zp*. No explicaremos qué es ni cómo se obtiene G porque tomaría todo otro artículo, basta con decir que G < p _.
1. Alice escoje un (a) < p que mantendrá privado.
    * Bob hace lo mismo: (b) < p. 
2. Alice calcula (A) = G^a mod p.
    * Bob calcula (B) = G^b mod p.
    * Esta es la parte pública de sus claves.
3. Alice envía su número público (A) a Bob
    * Bob hace lo mismo.
4. Alice usa el número de Bob para calcular (K) = B^a (mod p)
    * Bob calcula (K) = A^b (mod p).
    * Cada uno usa la parte pública que recibe, elevada a la potencia de la parte privada, módulo p.

¿Qué sucedió? Alice y Bob comparten ahora una clave `K = B^a = A^b:`
`K = (G^a)^b = (G^b)^a = G^(ab) (mod p)`
Y el servidor sólo vió A y B, tal que puede calcular algo como `K' = B*A ≠ K:`
`B*A = (G^a) * (G^b) = G^(a+b) ≠ G^(ab) (mod p)`
Y no ha forma eficiente de calcular K con A y B. Es más, porque p es primo y por las propiedades de G, calcular K es un [problema NP](https://es.wikipedia.org/wiki/Clases_de_complejidad_P_y_NP) llamado [problema del logarítmo discreto](https://es.wikipedia.org/wiki/Logaritmo_discreto).

Una vez que crearon su secreto compartido K, ahora cada usuario es responsable de encriptar y desencriptar los mensajes antes de enviarlos al servidor. Noten que usan la misma clave para encriptar y desencriptar ya que es una clave simétrica.

Ahora, veamos el ejemplo. Cualquier duda, repasen los pasos conretos que fuimos describiendo arriba.

> ejemplo con E2EE - dh.html

En la vida real, la práctica estándar es crear una clave simétrica kAB cada pocos minutos, o incluso para cada mensaje!

#### Backdoor
> relación corporación - govierno
Maneras posibles de crear un DH con un backdoor

backdoor - una propiedad matemática de los números usados para DH que nadie más conozca, que permita sólo al grupo de gente conocedora romper la encriptacion de esos datos

#### Conclución
la seguridad de un sistema es tan fuerte como su eslabón más débil
la razón principal para no crear una backdoor