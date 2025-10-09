<template>
    <div class="search-wrapper">
      <div class="search-container">
        <!-- Leading Search Icon Button -->
        <MdIconButton 
          icon="search"
          @click="$emit('searchClick')"
        />
  
        <!-- Search Input -->
        <input
          v-model="inputValue"
          type="text"
          :placeholder="placeholder"
          class="search-input"
          @input="handleInput"
        />
  
        <!-- Supporting Text -->
        <span v-if="supportingText" class="supporting-text">
          {{ supportingText }}
        </span>
  
        <!-- Optional Avatar -->
        <div v-if="showAvatar" class="avatar">
          <slot name="avatar"></slot>
        </div>
  
        <!-- Optional Trailing Icon -->
        <MdIconButton
          v-if="trailingIcon"
          :icon="trailingIcon"
          @click="$emit('trailingClick')"
        />
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, watch } from 'vue'
  import MdIconButton from '../icon-button/MdIconButton.vue'
  
  const props = defineProps({
    modelValue: {
      type: String,
      default: ''
    },
    placeholder: {
      type: String,
      default: 'Search...'
    },
    supportingText: {
      type: String,
      default: ''
    },
    showAvatar: {
      type: Boolean,
      default: false
    },
    trailingIcon: {
      type: String,
      default: ''
    }
  })
  
  const emit = defineEmits(['update:modelValue', 'searchClick', 'trailingClick'])
  
  const inputValue = ref(props.modelValue)
  
  watch(() => props.modelValue, (newValue) => {
    inputValue.value = newValue
  })
  
  const handleInput = () => {
    emit('update:modelValue', inputValue.value)
  }
  </script>
  
  <style scoped>
  .search-wrapper {
    width: 100%;
  }
  
  .search-container {
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 8px 16px;
    background: #ffffff;
    border: 1px solid #e2e8f0;
    border-radius: 8px;
  }
  
  .search-input {
    flex: 1;
    border: none;
    outline: none;
    font-size: 14px;
    background: transparent;
  }
  
  .supporting-text {
    color: #64748b;
    font-size: 14px;
  }
  
  .avatar {
    display: flex;
    align-items: center;
  }
  </style> 