"use client"

import { useState, useEffect } from "react"
import { Plus, Minus, Send, Home, Info, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { toast } from "@/components/ui/use-toast"
import { Toaster } from "@/components/ui/toaster"

function Thoughts() {
  // Initialize state with localStorage values if they exist
  const [count, setCount] = useState(() => {
    const savedCount = localStorage.getItem("count")
    return savedCount ? Number.parseInt(savedCount) : 0
  })

  const [thoughts, setThoughts] = useState(() => {
    const savedThoughts = localStorage.getItem("thoughts")
    return savedThoughts ? JSON.parse(savedThoughts) : ["I can't do", "You are amazing"]
  })

  const [input, setInput] = useState("")

  // Save to localStorage whenever state changes
  useEffect(() => {
    localStorage.setItem("count", count.toString())
  }, [count])

  useEffect(() => {
    localStorage.setItem("thoughts", JSON.stringify(thoughts))
  }, [thoughts])

  function handleSubmit(e) {
    e.preventDefault()

    if (!input.trim()) {
      toast({
        title: "Empty thought",
        description: "Please enter a thought before submitting",
        variant: "destructive",
      })
      return
    }

    setThoughts([...thoughts, input.trim()])
    setInput("")
    toast({
      title: "Thought added",
      description: "Your thought has been saved",
    })
  }

  function deleteThought(index) {
    const newThoughts = [...thoughts]
    newThoughts.splice(index, 1)
    setThoughts(newThoughts)
    toast({
      title: "Thought deleted",
      description: "Your thought has been removed",
    })
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-background">
      <Toaster />
      <NavBar />

      <Card className="w-full max-w-md shadow-lg">
        <CardHeader className="pb-2">
          <CardTitle className="text-xl font-medium text-center">My Thoughts & Counter</CardTitle>
        </CardHeader>

        <CardContent className="space-y-4">
          {/* Counter Section */}
          <Card>
            <CardContent className="p-0">
              <div className="flex flex-col items-center p-4">
                <div className="text-6xl font-bold py-8 text-primary">{count}</div>
                <div className="flex gap-2 w-full">
                  <Button variant="outline" className="flex-1" onClick={() => setCount(count - 1)}>
                    <Minus className="h-4 w-4 mr-2" />
                    Decrease
                  </Button>
                  <Button className="flex-1" onClick={() => setCount(count + 1)}>
                    <Plus className="h-4 w-4 mr-2" />
                    Increase
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Input Form */}
          <form onSubmit={handleSubmit} className="flex gap-2">
            <Input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Enter your thoughts"
              className="flex-1"
            />
            <Button type="submit" size="icon">
              <Send className="h-4 w-4" />
            </Button>
          </form>

          {/* Thoughts List */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-sm font-medium">Your Thoughts</h3>
              <Badge variant="outline">{thoughts.length}</Badge>
            </div>
            <Card>
              <ScrollArea className="h-[200px] rounded-md">
                <div className="p-2 space-y-2">
                  {thoughts.length > 0 ? (
                    thoughts.map((thought, i) => (
                      <ThoughtItem key={i} thought={thought} onDelete={() => deleteThought(i)} />
                    ))
                  ) : (
                    <p className="text-center text-muted-foreground p-4">No thoughts yet. Add some!</p>
                  )}
                </div>
              </ScrollArea>
            </Card>
          </div>
        </CardContent>

        <CardFooter className="flex justify-center text-xs text-muted-foreground">
          Your data is saved locally in your browser
        </CardFooter>
      </Card>
    </div>
  )
}

function NavBar() {
  return (
    <nav className="w-full max-w-md mb-6">
      <ul className="flex justify-center gap-4">
        <ListItem text="Home" icon={<Home className="h-4 w-4 mr-1" />} />
        <ListItem text="About" icon={<Info className="h-4 w-4 mr-1" />} />
      </ul>
    </nav>
  )
}

function ListItem({ text, icon }) {
  return (
    <li>
      <Button variant="outline" size="sm" className="flex items-center">
        {icon}
        {text}
      </Button>
    </li>
  )
}

function ThoughtItem({ thought, onDelete }) {
  return (
    <div className="flex items-center justify-between p-3 rounded-md border bg-card text-card-foreground">
      <p className="text-sm">{thought}</p>
      <Button variant="ghost" size="icon" onClick={onDelete} className="h-8 w-8">
        <Trash2 className="h-4 w-4 text-muted-foreground hover:text-destructive" />
      </Button>
    </div>
  )
}

export default Thoughts

