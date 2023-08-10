<template>
  <div class="chat">

    <div class="messages" ref="messages">
      <div
        v-for="(message, index) in displayableMessages"
        :key="index"
        class="message"
      >
        <div class="author">
          {{message.pseudo}}
          <span class="time">{{message.createdAt}}</span>
        </div>
        <div class="content">{{message.content}}</div>
      </div>
    </div>

    <div class="editor">
      <form @submit.prevent="switchToChat()">
          <input
            type="text"
            placeholder="Ton pseudo ici"
            v-model="pseudo"
            :disabled="! isEditing"
          >
          <button type="submit" :disabled="! pseudo">
            <img v-if="isEditing" src="../assets/check.svg" alt="Valider">
            <img v-else src="../assets/edit-pencil.svg" alt="Editer">
          </button>
      </form>

      <form @submit.prevent="sendMessage()">
        <textarea
          ref="textarea"
          @keypress.enter.exact.prevent="sendMessage()"
          placeholder="Ton message ici"
          :disabled="isEditing"
          v-model="content"
          rows="4">
        </textarea>
        <button type="submit" :disabled="isEditing">
          <img src="../assets/long-arrow-down-left.svg" alt="Envoyer">
        </button>
      </form>
    </div>
  </div>
</template>

<script lang="ts">
  import { defineComponent } from "vue";
  import type { Message } from "@/types";

  export default defineComponent({
    props: {
      socket: {
        type: Object,
        required: true
      }
    },
    data() {
      return {
        content: "",
        pseudo: "",
        isEditing: true,
        messages: new Array<Message>()
      };
    },
    created() {
      this.socket.on("chat", async (message: Message) => {
        this.messages.push(message);
        await this.scrollChatDown();
      });

      this.socket.on("retrieve-chat", async (messages: Message[]) => {
        this.messages.push(...messages);
        await this.scrollChatDown();
      });
    },
    methods: {
      sendMessage() {
        const message = {
          content: this.content,
          pseudo: this.pseudo
        };
        this.socket.emit("chat", message);
        this.content = "";
      },
      async scrollChatDown() {
        await this.$nextTick(); // Wait for complete render of the component before triggering the auto scroll
        const messagesElement = this.$refs.messages as HTMLElement;
        messagesElement.scrollTop = messagesElement.scrollHeight;
      },
      async switchToChat() {
        this.isEditing = ! this.isEditing;
        await this.$nextTick(); // Wait for complete render of the component before triggering the focus on text area

        const textareaElement = this.$refs.textarea as HTMLTextAreaElement;
        textareaElement.focus();
      }
    },
    computed: {
      displayableMessages(): Message[] {
        return this.messages.map((message: Message) => ({
          ...message,
          createdAt: convertToReadableDate(message.createdAt)
        }));

        function convertToReadableDate(date: string) {
          return new Date(date).toLocaleTimeString();
        }
      }
    }
  });
</script>

<style scoped>
  .chat {
    padding: 20px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }
  .author {
    display: flex;
    align-items: center;

    color: darkslategray;
    font-weight: bold;
    font-size: 16px;
  }
  .time {
    color: lightgray;
    font-size: 10px;
    margin-left: 5px;
  }

  .messages {
    overflow: scroll;
  }

  .message {
    margin-bottom: 10px;
  }

  .editor {
    padding-top: 20px;
    border-top: 1px solid darkslategray;
  }

  .content {
    white-space: pre-line;
  }

  form {
    display: flex;
    align-items: center;
  }

  form:first-child {
    margin-bottom: 20px;
  }

  form > :first-child {
    margin-right: 10px;
  }
</style>
