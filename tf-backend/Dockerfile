FROM hayd/deno:latest

EXPOSE 1337

WORKDIR /tf_backend/

# Cache the dependencies as a layer (this is re-run only when deps.ts is modified).
# Ideally this will download and compile _all_ external files used in main.ts.
COPY /src/ .

# Compile the main app so that it doesn't need to be compiled each startup/entry.
RUN deno cache main.ts

# These are passed as deno arguments when run with docker:
CMD ["run", "--allow-net", "--allow-env", "main.ts"]