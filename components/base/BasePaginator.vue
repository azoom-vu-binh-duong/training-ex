<template>
  <div>
    <ul>
      <li
        class="pagination-item"
        :class="{ '-disabled' : isInFirstPage }"
        @click.prevent="onClickFirstPage"
      >
        &laquo;
      </li>

      <li
        class="pagination-item"
        :class="{ '-disabled' : isInFirstPage }"
        @click.prevent="onClickPreviousPage"
      >
        Previous
      </li>

      <li
        v-for="page in pages"
        :key="page.name"
        class="pagination-item page-number"
        :class="{ active: isPageActive(page.name) }"
        @click.prevent="onClickPage(page.name)"
      >
        {{ page.name }}
      </li>

      <li
        class="pagination-item"
        :class="{ '-disabled' : isInLastPage }"
        @click="onClickNextPage"
      >
        Next
      </li>

      <li
        class="pagination-item"
        :class="{ '-disabled' : isInLastPage }"
        @click.prevent="onClickLastPage"
      >
        &raquo;
      </li>
    </ul>
  </div>
</template>
  
  <script>
export default {
  props: {
    maxVisibleButtons: {
      type: Number,
      required: false,
      default: 3,
    },

    totalPages: {
      type: Number,
      required: true,
    },

    total: {
      type: Number,
      required: true,
    },

    perPage: {
      type: Number,
      required: true,
    },

    currentPage: {
      type: Number,
      required: true,
    },

    hasMorePages: {
      type: Boolean,
      required: true,
    },
  },

  computed: {
    startPage() {
      if (this.currentPage === 1) {
        return 1
      }

      if (this.currentPage === this.totalPages) {
        return Math.max(1, this.totalPages - this.maxVisibleButtons + 1)
      }

      return this.currentPage - 1
    },
    endPage() {
      return Math.min(
        this.startPage + this.maxVisibleButtons - 1,
        this.totalPages
      )
    },
    pages() {
      const range = []
      for (let i = this.startPage; i <= this.endPage; i += 1) {
        range.push({
          name: i,
          isDisabled: i === this.currentPage,
        })
      }

      return range
    },
    isInFirstPage() {
      return this.currentPage === 1
    },
    isInLastPage() {
      return this.currentPage === this.totalPages
    },
  },

  methods: {
    onClickFirstPage() {
      this.$emit('pagechanged', 1)
    },
    onClickPreviousPage() {
      this.$emit('pagechanged', this.currentPage - 1)
    },
    onClickPage(page) {
      this.$emit('pagechanged', page)
    },
    onClickNextPage() {
      this.$emit('pagechanged', this.currentPage + 1)
    },
    onClickLastPage() {
      this.$emit('pagechanged', this.totalPages)
    },
    isPageActive(page) {
      return this.currentPage === page
    },
  },
}
</script>
  
<style scoped lang="scss">
@import '~assets/style/color';

.pagination-item {
  display: inline-block;
  margin-right: 5px;
  border: 1px solid $main-orange;
  padding: 4px 10px;
  font-size: 17px;

  &:hover {
    background-color: $main-orange;
    color: $main-black;
    transition: all ease 0.3s;
    cursor: pointer;
  }

  &.-disabled {
    pointer-events: none;
    cursor: default;
  }

  &.active {
    background-color: $main-orange;
    color: $main-black;
    transition: all ease 0.3s;
  }
}
</style>