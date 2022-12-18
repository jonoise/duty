import { Modal } from '@/components/generics'
import { CreateProjectForm } from '../forms'

export const NewProjectButton = () => {
  return (
    <>
      <Modal
        ActionComponent={({ onOpen }) => (
          <button onClick={onOpen} className='px-5 py-1 bg-blue-600 rounded'>
            Create project
          </button>
        )}
      >
        {({ setIsOpen }) => <CreateProjectForm setIsOpen={setIsOpen} />}
      </Modal>
    </>
  )
}
