const personHelper = {
    getInitials: (fullName: string): string => {
        let initials = '';
        fullName.split(' ').forEach(item => {
            initials += item.at(0) as string;
        })

        return initials;
    }
}

export { personHelper }
