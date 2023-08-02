class Node:
    def __init__(self, value):
        self.value = value  #This is the value of the node
        self.next = None      #This is the pointer of the node

class LinkedList:

    def __init__(self, value):
        new_node = Node(value)
        self.head = new_node
        self.tail = new_node
        self.length = 1

    def print_list(self):
        temp = self.head
        while temp is not None:
            print(temp.value)
            temp = temp.next

    def append(self,value):
        node = Node(value)
        if self.length == 0: #if the list is empty, we do this
            self.head = node
            self.tail = node
        else:                   #else we add the new node
            self.tail.next = node
            self.tail = node
        self.length += 1

    def pop(self):
        if self.length == 0:
            return None
        temp = self.head
        pre = self.head
        while(temp.next): # This while loop iterates till second last node is reached
                pre = temp
                temp = temp.next
        self.tail = pre # Previous node
        self.tail.next = None
        self.length -= 1
        if self.length == 0:
            self.head = None
            self.tail = None
        return temp.value
    
    def prepend(self,value):
        node = Node(value)
        if self.length == 0: # Create a new linked list in case of no item
            self.head = node
            self.tail = node
        else:   
            node.next = self.head
            self.head = node
        self.length += 1
    
    def pop_first(self):
        if self.length == 0:
            return None
        temp = self.head
        self.head = self.head.next
        temp.next = None
        self.length -= 1
        if self.length == 1:
            self.tail = None
    
    def get(self, index):
        if index < 0 or index >= self.length:
            return None
        temp = self.head
        for _ in range(index):
            temp = temp.next
        return temp
    
    def set_value(self, index, value):
        temp = self.get(index)
        if temp:
            temp.value = value  
    
    def insert(self, index, value):
        if index < 0 or index > self.length:
            return None
        if index == 0:
            return self.prepend(value)
        if index == self.length:
            return self.append(value)
        temp = self.get(index - 1)
        node = Node(value)
        node.next = temp.next
        temp.next = node
        self.length += 1
    
    def remove(self, index):
        if index < 0 or index >= self.length:
            return None
        if index == 0:
            return self.pop_first()
        if index == self.length-1:
            return self.pop()
        pre = self.get(index-1)
        temp = pre.next
        pre.next = temp.next
        temp.next = None
        self.length -= 1
        return temp
    
    def reverse(self):
        temp = self.head
        self.head = self.tail
        self.tail = temp
        after = temp.next
        before = None
        for _ in range(self.length):
            after = temp.next
            temp.next = before
            before = temp
            temp = after

ll = LinkedList(0)
ll.append(2)
ll.insert(1,1)
ll.remove(1)
ll.print_list()
ll.reverse()
ll.print_list()