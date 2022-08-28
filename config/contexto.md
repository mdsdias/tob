# está aqui é a pagina de *contexto*

## Porque?

codigos são confusos, então tem uma explicação porca e rasa de como funciona! :D

## Corpus.json

- Oq é essa merda?
- pq esta poha é enorme??
- e pq nada faz sentido?

### Oq é essa merda?

Bom ela serve pro nosso sistema "aprender" ao oq responder

### pq esta poha é enorme??

Pois com mais dados mais situações ela sabe comportar-se

### e pq *"nada faz sentido"*?

Pois o sistema usa uma forma abstrata de representar as coisas

assim ó

```json
{
    "input":{
      "alguma": 1,
      "coisa": 1
    },
    "output":{
        "chave-pra-respostas": 1
    }
  },
  ...
}
```

### oq serve cada coisinia ali em cima?

#### input

ele serve pra colocarmos o nosso texto, de um usuario que enviou
exemplo:

```shell
> User: Olá!
# Tob: Oi
```

mas ...

#### output

bom o output vai ser oq a gente mostra o correto
e apartir de oque aparecer no output criamos um "sistema"
que busca uma resposta baseada naquele output

----
é isso ae, duvidas?
kguei :D
