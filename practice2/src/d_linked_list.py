class Node:
    def __init__(self, value):
        self.value = value
        self.next = None
        self.prev = None

class Doubly_Linked_List:
    def __init__(self, value):
        node = Node(value)
        self.head = node
        self.tail = node
        self.length = 1
    
    def print_list(self):
        node = self.head
        while node is not None:
            print(node.value)
            node = node.next

    def append(self,value):
        node = Node(value)
        if self.head is None:
            self.head = node
            self.tail = node
        else:
            self.tail.next = node
            node.prev = self.tail
            self.tail = node
        self.length += 1

    def pop(self):
        if self.length == 0:
            return None
        node = self.tail
        if self.length == 1:
            self.head = None
            self.tail = None
        else:
            self.tail = self.tail.prev
            self.tail.next = None
            node.prev = None
        self.length -= 1
        return node
    
    def prepend(self, value):
        node = Node(value)
        if self.length == 0:
            self.head = node
            self.tail = node
        else:
            self.head.prev = node
            node.next= self.head
            self.head = node
        self.length += 1

    def pop_first(self):
        if self.length == 0:
            return None
        node = self.head
        if self.length == 1:
            self.head = None
            self.tail = None
        else:
            self.head = self.head.next
            self.head.prev = None
            node.next = None
        self.length -= 1
        return node
    
    def get(self, index):
        if index < 0 or index >= self.length:
            return None
        node = self.head
        if index < self.length/2:
            for _ in range(index):
                node = node.next
        else:
            node = self.tail
            for _ in range(self.length-1,index,-1):
                node = node.prev
        return node
    
    def set_value(self, index, value):
        node = self.get(index)
        if node:
            node.value = value

    def insert(self, value, index):
        if index < 0 or index > self.length:
            return False
        if index == 0:
            return self.prepend(value)
        if index == self.length:
            return self.append(value)
        node = Node(value)
        before = self.get(index-1)
        after = before.next
        node.prev = before
        node.next = after
        before.next = node
        after.prev = node
        self.length += 1
        return True
     
    def remove(self, index):
        if index < 0 or index > self.length:
            return None
        if index == 0:
            return self.pop_first()
        if index == self.length-1:
            return self.pop()
        node = self.get(index)
        node.next.prev = node.prev
        node.prev.next = node.next
        node.prev = None
        node.next = None
        self.length-=1
        return node

        

dll = Doubly_Linked_List(1)
dll.append(2)
dll.append(3)
dll.append(4)
dll.print_list()
print()
print(dll.get(2).value)